<?php

namespace App\Events;

use App\Models\Auction;
use App\Models\Bid;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class BidPlaced implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Bid $bid,
        public Auction $auction
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('auction.' . $this->auction->id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'bid' => [
                'id' => $this->bid->id,
                'amount' => $this->bid->amount,
                'bidder' => [
                    'id' => $this->bid->bidder->id,
                    'name' => $this->bid->bidder->name,
                    'avatar_url' => $this->bid->bidder->avatar_url,
                ],
                'triggered_anti_snipe' => $this->bid->triggered_anti_snipe,
                'created_at' => $this->bid->created_at,
            ],
            'auction' => [
                'id' => $this->auction->id,
                'current_bid' => $this->auction->current_bid,
                'end_time' => $this->auction->end_time,
                'snipe_extensions' => $this->auction->snipe_extensions,
                'status' => $this->auction->status,
            ],
        ];
    }
}
