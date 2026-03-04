<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function buyerOrders(Request $request)
    {
        $orders = Order::with(['auction', 'seller'])
            ->where('buyer_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);
        return response()->json($orders);
    }

    public function sellerOrders(Request $request)
    {
        $orders = Order::with(['auction', 'buyer'])
            ->where('seller_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->paginate(20);
        return response()->json($orders);
    }

    public function show(Request $request, $id)
    {
        $order = Order::with(['auction', 'buyer', 'seller'])->findOrFail($id);
        if ($order->buyer_id !== $request->user()->id && $order->seller_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json($order);
    }

    public function updateShipping(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        if ($order->seller_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'tracking_number' => 'required|string',
            'shipping_carrier' => 'required|string',
        ]);

        $order->update([
            'tracking_number' => $request->tracking_number,
            'shipping_carrier' => $request->shipping_carrier,
            'status' => 'shipped',
            'shipped_at' => now(),
        ]);

        return response()->json($order);
    }

    public function confirmDelivery(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        if ($order->buyer_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order->update([
            'status' => 'delivered',
            'delivered_at' => now(),
        ]);

        // Release escrow to seller wallet
        $escrow = \App\Models\EscrowPayment::where('auction_id', $order->auction_id)->first();
        if ($escrow && $escrow->status === 'held') {
            $escrow->update(['status' => 'released', 'released_at' => now()]);
            $wallet = \App\Models\Wallet::firstOrCreate(['user_id' => $order->seller_id]);
            $wallet->increment('available_balance', $escrow->seller_amount);
            $wallet->decrement('pending_balance', $escrow->seller_amount);
        }

        return response()->json($order);
    }
}
