<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminAuditLog;
use App\Models\Auction;
use App\Models\Bid;
use App\Models\BoostCampaign;
use App\Models\EscrowPayment;
use App\Models\FraudReport;
use App\Models\LedgerEntry;
use App\Models\PayoutRequest;
use App\Models\User;
use App\Models\Wallet;
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

    private function audit(Request $request, string $action, ?string $targetType = null, ?int $targetId = null, ?string $details = null): void
    {
        AdminAuditLog::create([
            'admin_id' => $request->user()->id,
            'action' => $action,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'details' => $details,
            'ip_address' => $request->ip(),
        ]);
    }

    public function dashboard()
    {
        $todayBids = Bid::whereDate('created_at', today())->count();
        $totalRevenue = LedgerEntry::sum('winning_bid');
        $totalFees = LedgerEntry::sum('platform_fee');
        $pendingPayouts = PayoutRequest::where('status', 'pending')->sum('amount');

        $topAuctions = Auction::whereIn('status', ['live', 'ending_soon'])
            ->orderByDesc('bid_count')
            ->limit(5)
            ->get(['id', 'title', 'current_bid', 'bid_count', 'status']);

        $topSellers = User::where('is_seller', true)
            ->orderByDesc('total_auctions_completed')
            ->limit(5)
            ->get(['id', 'name', 'tiktok_username', 'seller_rating', 'total_auctions_completed']);

        return response()->json([
            'total_auctions' => Auction::count(),
            'active_auctions' => Auction::whereIn('status', ['live', 'ending_soon'])->count(),
            'total_bids' => Bid::count(),
            'bids_today' => $todayBids,
            'total_users' => User::count(),
            'total_sellers' => User::where('is_seller', true)->count(),
            'upcoming_auctions' => Auction::where('status', 'upcoming')->count(),
            'ended_auctions' => Auction::where('status', 'ended')->count(),
            'total_revenue' => $totalRevenue,
            'total_fees' => $totalFees,
            'pending_payouts' => $pendingPayouts,
            'escrow_held' => EscrowPayment::where('status', 'held')->sum('amount'),
            'top_auctions' => $topAuctions,
            'top_sellers' => $topSellers,
            'fraud_alerts' => FraudReport::where('status', 'pending')->count(),
        ]);
    }

    public function users(Request $request)
    {
        $query = User::withCount(['auctions', 'bids']);
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('tiktok_username', 'like', "%{$request->search}%");
            });
        }
        if ($request->role) $query->where('role', $request->role);
        if ($request->is_seller) $query->where('is_seller', true);

        return response()->json($query->orderByDesc('created_at')->paginate(20));
    }

    public function updateUserRole(Request $request, $id)
    {
        $request->validate(['role' => 'required|in:user,admin']);
        $user = User::findOrFail($id);
        $user->update(['role' => $request->role]);
        $this->audit($request, 'update_role', 'User', $id, "Changed to {$request->role}");
        return response()->json($user);
    }

    public function allAuctions(Request $request)
    {
        $query = Auction::with(['creator'])->withCount('bids');
        if ($request->status) $query->where('status', $request->status);
        if ($request->search) $query->where('title', 'like', "%{$request->search}%");
        return response()->json($query->orderByDesc('created_at')->paginate(20));
    }

    public function endAuctionEarly(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);
        $auction->update(['status' => 'ended', 'end_time' => now()]);
        $this->audit($request, 'end_auction_early', 'Auction', $id);
        return response()->json($auction);
    }

    public function pauseAuction(Request $request, $id)
    {
        $auction = Auction::findOrFail($id);
        $auction->update(['status' => 'upcoming']);
        $this->audit($request, 'pause_auction', 'Auction', $id);
        return response()->json($auction);
    }

    public function extendAuction(Request $request, $id)
    {
        $request->validate(['minutes' => 'required|integer|min:1']);
        $auction = Auction::findOrFail($id);
        $auction->update(['end_time' => $auction->end_time->addMinutes($request->minutes)]);
        $this->audit($request, 'extend_auction', 'Auction', $id, "+{$request->minutes} minutes");
        return response()->json($auction);
    }

    public function updateSellerStatus(Request $request, $id)
    {
        $request->validate(['seller_status' => 'required|in:active,suspended,banned']);
        $user = User::findOrFail($id);
        $user->update([
            'seller_status' => $request->seller_status,
            'seller_verified' => $request->seller_status === 'active' ? $request->boolean('verified', $user->seller_verified) : false,
        ]);
        $this->audit($request, 'update_seller_status', 'User', $id, $request->seller_status);
        return response()->json($user);
    }

    public function payments()
    {
        $ledger = LedgerEntry::with(['auction', 'buyer', 'seller'])
            ->orderByDesc('created_at')
            ->paginate(20);
        return response()->json([
            'entries' => $ledger,
            'summary' => [
                'total_revenue' => LedgerEntry::sum('winning_bid'),
                'total_fees' => LedgerEntry::sum('platform_fee'),
                'total_payouts' => LedgerEntry::where('status', 'released')->sum('net_payout'),
                'escrow_held' => EscrowPayment::where('status', 'held')->sum('amount'),
                'pending_payouts' => PayoutRequest::where('status', 'pending')->sum('amount'),
            ],
        ]);
    }

    public function updatePayout(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:processing,completed,rejected']);
        $payout = PayoutRequest::findOrFail($id);
        $payout->update(['status' => $request->status, 'processed_at' => now()]);

        if ($request->status === 'rejected') {
            $wallet = Wallet::where('user_id', $payout->user_id)->first();
            if ($wallet) $wallet->increment('available_balance', $payout->amount);
        }
        if ($request->status === 'completed') {
            $wallet = Wallet::where('user_id', $payout->user_id)->first();
            if ($wallet) $wallet->increment('withdrawn_amount', $payout->amount);
        }

        $this->audit($request, 'update_payout', 'PayoutRequest', $id, $request->status);
        return response()->json($payout);
    }

    public function boostCampaigns()
    {
        return response()->json(
            BoostCampaign::with(['auction', 'user'])->orderByDesc('created_at')->paginate(20)
        );
    }

    public function updateBoostCampaign(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:active,paused,completed,rejected']);
        $campaign = BoostCampaign::findOrFail($id);
        $campaign->update(['status' => $request->status]);
        $this->audit($request, 'update_boost_campaign', 'BoostCampaign', $id, $request->status);
        return response()->json($campaign);
    }

    public function fraudReports()
    {
        return response()->json(
            FraudReport::with('reporter')->orderByDesc('created_at')->paginate(20)
        );
    }

    public function updateFraudReport(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:reviewed,resolved,dismissed']);
        $report = FraudReport::findOrFail($id);
        $report->update(['status' => $request->status]);
        $this->audit($request, 'update_fraud_report', 'FraudReport', $id, $request->status);
        return response()->json($report);
    }

    public function auditLogs()
    {
        return response()->json(
            AdminAuditLog::with('admin')->orderByDesc('created_at')->paginate(50)
        );
    }

    public function settings()
    {
        $settings = \App\Models\PlatformSetting::pluck('value', 'key');
        return response()->json($settings->isEmpty() ? [
            'platform_fee_percent' => '10',
            'min_withdrawal' => '10',
            'anti_snipe_seconds' => '10',
            'max_auction_duration_days' => '7',
        ] : $settings);
    }

    public function updateSettings(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            \App\Models\PlatformSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        $this->audit($request, 'update_settings', null, null, json_encode($request->all()));
        return response()->json(['message' => 'Settings updated']);
    }
}
