<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\AuctionImage;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuctionController extends Controller
{
    public function index(Request $request)
    {
        $query = Auction::with(['creator', 'images', 'bids'])
            ->withCount('bids');

        if ($request->has('status') && $request->status !== 'all') {
            $query->byStatus($request->status);
        }

        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        $auctions = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($auctions);
    }

    public function show($id)
    {
        $auction = Auction::with(['creator', 'images', 'bids.bidder', 'bids' => function ($q) {
            $q->orderBy('amount', 'desc');
        }])
            ->withCount('bids')
            ->findOrFail($id);

        return response()->json($auction);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'current_bid' => 'required|numeric|min:0.01',
            'reserve_price' => 'nullable|numeric|min:0',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'anti_snipe_seconds' => 'sometimes|integer|min:0|max:3600',
            'tiktok_video_url' => 'nullable|string|url',
            'images' => 'sometimes|array',
            'images.*' => 'string',
        ]);

        $auction = DB::transaction(function () use ($validated, $request) {
            $auction = Auction::create([
                'creator_id' => $request->user()->id,
                'title' => $validated['title'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'current_bid' => $validated['current_bid'],
                'reserve_price' => $validated['reserve_price'] ?? null,
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'anti_snipe_seconds' => $validated['anti_snipe_seconds'] ?? 300,
                'tiktok_video_url' => $validated['tiktok_video_url'] ?? null,
                'status' => now()->gte($validated['start_time']) ? 'live' : 'upcoming',
            ]);

            if (!empty($validated['images'])) {
                foreach ($validated['images'] as $index => $imageUrl) {
                    AuctionImage::create([
                        'auction_id' => $auction->id,
                        'url' => $imageUrl,
                        'display_order' => $index,
                    ]);
                }
            }

            return $auction;
        });

        return response()->json($auction->load(['creator', 'images']), 201);
    }

    public function update(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);

        if ($auction->creator_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string|max:100',
            'reserve_price' => 'nullable|numeric|min:0',
            'end_time' => 'sometimes|date',
            'tiktok_video_url' => 'nullable|string',
            'images' => 'sometimes|array',
            'images.*' => 'string',
        ]);

        $auction->update($validated);

        if (isset($validated['images'])) {
            $auction->images()->delete();
            foreach ($validated['images'] as $index => $imageUrl) {
                AuctionImage::create([
                    'auction_id' => $auction->id,
                    'url' => $imageUrl,
                    'display_order' => $index,
                ]);
            }
        }

        return response()->json($auction->fresh()->load(['creator', 'images']));
    }

    public function destroy(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);

        if ($auction->creator_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $auction->delete();
        return response()->json(['message' => 'Auction deleted successfully']);
    }

    public function categories()
    {
        $categories = Auction::select('category')
            ->distinct()
            ->pluck('category');

        return response()->json($categories);
    }

    public function similar($id)
    {
        $auction = Auction::findOrFail($id);

        $similar = Auction::with(['creator', 'images'])
            ->where('category', $auction->category)
            ->where('id', '!=', $auction->id)
            ->where('status', '!=', 'ended')
            ->withCount('bids')
            ->limit(6)
            ->get();

        return response()->json($similar);
    }

    public function save(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);
        $user = $request->user();

        $exists = $user->savedAuctions()->where('auction_id', $id)->exists();

        if ($exists) {
            $user->savedAuctions()->detach($id);
            return response()->json(['saved' => false, 'message' => 'Auction unsaved']);
        }

        $user->savedAuctions()->attach($id);
        return response()->json(['saved' => true, 'message' => 'Auction saved']);
    }

    public function saved(Request $request)
    {
        $auctions = $request->user()
            ->savedAuctions()
            ->with(['creator', 'images'])
            ->withCount('bids')
            ->get();

        return response()->json($auctions);
    }

    public function isSaved(Request $request, $id)
    {
        $saved = $request->user()->savedAuctions()->where('auction_id', $id)->exists();
        return response()->json(['saved' => $saved]);
    }

    public function myAuctions(Request $request)
    {
        $auctions = Auction::with(['creator', 'images'])
            ->withCount('bids')
            ->where('creator_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($auctions);
    }

    public function myBids(Request $request)
    {
        $auctionIds = $request->user()->bids()->distinct()->pluck('auction_id');

        $auctions = Auction::with(['creator', 'images'])
            ->withCount('bids')
            ->whereIn('id', $auctionIds)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($auctions);
    }

    public function wonAuctions(Request $request)
    {
        $auctions = Auction::with(['creator', 'images'])
            ->withCount('bids')
            ->where('status', 'ended')
            ->whereHas('highestBid', function ($q) use ($request) {
                $q->where('bidder_id', $request->user()->id);
            })
            ->orderBy('end_time', 'desc')
            ->get();

        return response()->json($auctions);
    }

    public function uploadImages(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $urls = [];
        foreach ($request->file('images') as $image) {
            $path = $image->store('auction-images', 'public');
            $urls[] = '/storage/' . $path;
        }

        return response()->json(['urls' => $urls]);
    }
}
