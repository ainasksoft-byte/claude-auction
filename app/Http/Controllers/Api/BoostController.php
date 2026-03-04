<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BoostCampaign;
use Illuminate\Http\Request;

class BoostController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'auction_id' => 'required|exists:auctions,id',
            'boost_type' => 'required|in:video,listing,profile',
            'placement' => 'required|in:for_you,shop,creator_discovery',
            'budget' => 'required|numeric|min:5',
        ]);

        $campaign = BoostCampaign::create([
            'auction_id' => $request->auction_id,
            'user_id' => $request->user()->id,
            'boost_type' => $request->boost_type,
            'placement' => $request->placement,
            'budget' => $request->budget,
            'status' => 'active',
        ]);

        return response()->json($campaign, 201);
    }

    public function myCampaigns(Request $request)
    {
        $campaigns = BoostCampaign::with('auction')
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);
        return response()->json($campaigns);
    }
}
