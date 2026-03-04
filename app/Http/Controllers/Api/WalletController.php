<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wallet;
use App\Models\PayoutRequest;
use App\Models\LedgerEntry;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function show(Request $request)
    {
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['available_balance' => 0, 'pending_balance' => 0, 'withdrawn_amount' => 0, 'platform_fees_paid' => 0]
        );
        return response()->json($wallet);
    }

    public function ledger(Request $request)
    {
        $entries = LedgerEntry::where('seller_id', $request->user()->id)
            ->orWhere('buyer_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);
        return response()->json($entries);
    }

    public function requestPayout(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10',
            'payout_method' => 'required|in:stripe,paypal,bank_transfer',
        ]);

        $wallet = Wallet::where('user_id', $request->user()->id)->first();
        if (!$wallet || $wallet->available_balance < $request->amount) {
            return response()->json(['message' => 'Insufficient balance'], 422);
        }

        $payout = PayoutRequest::create([
            'user_id' => $request->user()->id,
            'amount' => $request->amount,
            'payout_method' => $request->payout_method,
            'status' => 'pending',
        ]);

        $wallet->decrement('available_balance', $request->amount);

        return response()->json($payout, 201);
    }

    public function payoutHistory(Request $request)
    {
        $payouts = PayoutRequest::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);
        return response()->json($payouts);
    }
}
