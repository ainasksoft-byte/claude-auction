<?php

namespace App\Console\Commands;

use App\Events\AuctionUpdated;
use App\Models\Auction;
use App\Models\Notification;
use Illuminate\Console\Command;

class TransitionAuctionStatuses extends Command
{
    protected $signature = 'auctions:transition';
    protected $description = 'Transition auction statuses based on time';

    public function handle(): void
    {
        $now = now();

        // Upcoming → Live (start_time reached)
        $toStart = Auction::where('status', 'upcoming')
            ->where('start_time', '<=', $now)
            ->get();

        foreach ($toStart as $auction) {
            $auction->update(['status' => 'live']);
            broadcast(new AuctionUpdated($auction));

            // Notify users with bid reminders
            $reminderUserIds = $auction->bidReminders()
                ->where('enabled', true)
                ->pluck('user_id');

            foreach ($reminderUserIds as $userId) {
                Notification::create([
                    'user_id' => $userId,
                    'type' => 'auction_started',
                    'title' => 'Auction Started!',
                    'content' => '"' . $auction->title . '" is now live. Place your bids!',
                    'auction_id' => $auction->id,
                ]);
            }
        }

        // Live → Ending Soon (< 5 minutes remaining)
        $toEndingSoon = Auction::where('status', 'live')
            ->where('end_time', '<=', $now->copy()->addMinutes(5))
            ->where('end_time', '>', $now)
            ->get();

        foreach ($toEndingSoon as $auction) {
            $auction->update(['status' => 'ending_soon']);
            broadcast(new AuctionUpdated($auction));

            // Notify bidders about ending soon
            $bidderIds = $auction->bids()->distinct()->pluck('bidder_id');
            foreach ($bidderIds as $bidderId) {
                Notification::create([
                    'user_id' => $bidderId,
                    'type' => 'ending_soon',
                    'title' => 'Auction Ending Soon!',
                    'content' => '"' . $auction->title . '" is ending in less than 5 minutes!',
                    'auction_id' => $auction->id,
                ]);
            }
        }

        // Ending Soon/Live → Ended (end_time passed)
        $toEnd = Auction::whereIn('status', ['live', 'ending_soon'])
            ->where('end_time', '<=', $now)
            ->get();

        foreach ($toEnd as $auction) {
            $auction->update(['status' => 'ended']);
            broadcast(new AuctionUpdated($auction));

            // Notify winner
            $highestBid = $auction->bids()->orderBy('amount', 'desc')->first();
            if ($highestBid) {
                Notification::create([
                    'user_id' => $highestBid->bidder_id,
                    'type' => 'auction_won',
                    'title' => 'Congratulations! You Won!',
                    'content' => 'You won "' . $auction->title . '" with a bid of $' . number_format($highestBid->amount, 2) . '!',
                    'auction_id' => $auction->id,
                ]);
            }
        }

        $total = $toStart->count() + $toEndingSoon->count() + $toEnd->count();
        if ($total > 0) {
            $this->info("Transitioned {$total} auctions.");
        }
    }
}
