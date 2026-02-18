<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Auction;
use App\Models\Bid;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!$request->user() || !$request->user()->isAdmin()) {
                return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
            }
            return $next($request);
        });
    }

    public function dashboard()
    {
        return response()->json([
            'total_auctions' => Auction::count(),
            'active_auctions' => Auction::whereIn('status', ['live', 'ending_soon'])->count(),
            'total_bids' => Bid::count(),
            'total_users' => User::count(),
            'upcoming_auctions' => Auction::where('status', 'upcoming')->count(),
            'ended_auctions' => Auction::where('status', 'ended')->count(),
        ]);
    }

    public function users()
    {
        $users = User::withCount(['auctions', 'bids'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($users);
    }

    public function updateUserRole(Request $request, $id)
    {
        $validated = $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user = User::findOrFail($id);
        $user->update(['role' => $validated['role']]);

        return response()->json($user);
    }

    public function endAuctionEarly($id)
    {
        $auction = Auction::findOrFail($id);
        $auction->update([
            'status' => 'ended',
            'end_time' => now(),
        ]);

        return response()->json($auction);
    }

    public function allAuctions()
    {
        $auctions = Auction::with(['creator'])
            ->withCount('bids')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($auctions);
    }
}
