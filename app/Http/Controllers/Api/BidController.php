<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\Bid;
use App\Models\Notification;
use App\Events\BidPlaced;
use App\Events\AuctionUpdated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BidController extends Controller
{
    public function store(Request $request, $auctionId)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
        ]);

        $auction = Auction::with('highestBid')->findOrFail($auctionId);

        // Validate auction is active
        if (!$auction->isLive()) {
            return response()->json(['message' => 'This auction is not currently accepting bids'], 422);
        }

        // Can't bid on own auction
        if ($auction->creator_id === $request->user()->id) {
            return response()->json(['message' => 'You cannot bid on your own auction'], 422);
        }

        // Bid must be higher than current bid
        if ($validated['amount'] <= $auction->current_bid) {
            return response()->json([
                'message' => 'Bid must be higher than the current bid of $' . number_format($auction->current_bid, 2)
            ], 422);
        }

        $bid = DB::transaction(function () use ($validated, $auction, $request) {
            $now = now();
            $secondsUntilEnd = $now->diffInSeconds($auction->end_time, false);
            $triggeredAntiSnipe = $secondsUntilEnd <= $auction->anti_snipe_seconds && $secondsUntilEnd > 0;

            // Get previous highest bidder for notification
            $previousHighBidder = $auction->highestBid?->bidder_id;

            $bid = Bid::create([
                'auction_id' => $auction->id,
                'bidder_id' => $request->user()->id,
                'amount' => $validated['amount'],
                'triggered_anti_snipe' => $triggeredAntiSnipe,
            ]);

            // Update auction current bid
            $updateData = ['current_bid' => $validated['amount']];

            // Anti-snipe: extend auction end time
            if ($triggeredAntiSnipe) {
                $updateData['end_time'] = $auction->end_time->addSeconds($auction->anti_snipe_seconds);
                $updateData['snipe_extensions'] = $auction->snipe_extensions + 1;
            }

            $auction->update($updateData);

            // Notify previous highest bidder they've been outbid
            if ($previousHighBidder && $previousHighBidder !== $request->user()->id) {
                Notification::create([
                    'user_id' => $previousHighBidder,
                    'type' => 'outbid',
                    'title' => 'You\'ve been outbid!',
                    'content' => 'Someone placed a higher bid of $' . number_format($validated['amount'], 2) . ' on "' . $auction->title . '"',
                    'auction_id' => $auction->id,
                ]);
            }

            return $bid;
        });

        $bid->load('bidder');
        $auction->refresh();

        // Broadcast bid event
        broadcast(new BidPlaced($bid, $auction))->toOthers();

        if ($bid->triggered_anti_snipe) {
            broadcast(new AuctionUpdated($auction))->toOthers();
        }

        return response()->json([
            'bid' => $bid,
            'auction' => $auction->load(['creator', 'images']),
        ], 201);
    }

    public function history($auctionId)
    {
        $bids = Bid::with('bidder')
            ->where('auction_id', $auctionId)
            ->orderBy('amount', 'desc')
            ->get();

        return response()->json($bids);
    }

    public function toggleReminder(Request $request, $auctionId)
    {
        $auction = Auction::findOrFail($auctionId);
        $user = $request->user();

        $reminder = $user->bidReminders()->where('auction_id', $auctionId)->first();

        if ($reminder) {
            $reminder->update(['enabled' => !$reminder->enabled]);
            return response()->json(['enabled' => $reminder->fresh()->enabled]);
        }

        $user->bidReminders()->create([
            'auction_id' => $auctionId,
            'enabled' => true,
        ]);

        return response()->json(['enabled' => true]);
    }

    public function reminderStatus(Request $request, $auctionId)
    {
        $reminder = $request->user()->bidReminders()
            ->where('auction_id', $auctionId)
            ->first();

        return response()->json(['enabled' => $reminder?->enabled ?? false]);
    }
}
