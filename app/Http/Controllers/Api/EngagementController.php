<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\AuctionComment;
use App\Models\AutoBid;
use Illuminate\Http\Request;

class EngagementController extends Controller
{
    public function toggleLike(Request $request, $auctionId)
    {
        $auction = Auction::findOrFail($auctionId);
        $exists = \DB::table('auction_likes')
            ->where('user_id', $request->user()->id)
            ->where('auction_id', $auctionId)
            ->exists();

        if ($exists) {
            \DB::table('auction_likes')
                ->where('user_id', $request->user()->id)
                ->where('auction_id', $auctionId)
                ->delete();
            $auction->decrement('like_count');
            return response()->json(['liked' => false]);
        }

        \DB::table('auction_likes')->insert([
            'user_id' => $request->user()->id,
            'auction_id' => $auctionId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $auction->increment('like_count');
        return response()->json(['liked' => true]);
    }

    public function isLiked(Request $request, $auctionId)
    {
        $liked = \DB::table('auction_likes')
            ->where('user_id', $request->user()->id)
            ->where('auction_id', $auctionId)
            ->exists();
        return response()->json(['liked' => $liked]);
    }

    public function comments($auctionId)
    {
        $comments = AuctionComment::with('user')
            ->where('auction_id', $auctionId)
            ->orderByDesc('created_at')
            ->paginate(50);
        return response()->json($comments);
    }

    public function addComment(Request $request, $auctionId)
    {
        $request->validate(['content' => 'required|string|max:500']);

        $comment = AuctionComment::create([
            'user_id' => $request->user()->id,
            'auction_id' => $auctionId,
            'content' => $request->content,
        ]);

        return response()->json($comment->load('user'), 201);
    }

    public function setAutoBid(Request $request, $auctionId)
    {
        $request->validate(['max_amount' => 'required|numeric|min:1']);

        $autoBid = AutoBid::updateOrCreate(
            ['user_id' => $request->user()->id, 'auction_id' => $auctionId],
            ['max_amount' => $request->max_amount, 'active' => true]
        );

        return response()->json($autoBid);
    }

    public function cancelAutoBid(Request $request, $auctionId)
    {
        AutoBid::where('user_id', $request->user()->id)
            ->where('auction_id', $auctionId)
            ->update(['active' => false]);

        return response()->json(['message' => 'Auto-bid cancelled']);
    }

    public function share(Request $request, $auctionId)
    {
        Auction::findOrFail($auctionId)->increment('share_count');
        return response()->json(['message' => 'Share recorded']);
    }
}
