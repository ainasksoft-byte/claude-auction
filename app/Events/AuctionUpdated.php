<?php

namespace App\Events;

use App\Models\Auction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AuctionUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Auction $auction
    ) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('auction.' . $this->auction->id),
            new Channel('auctions'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'auction' => [
                'id' => $this->auction->id,
                'current_bid' => $this->auction->current_bid,
                'end_time' => $this->auction->end_time,
                'status' => $this->auction->status,
                'snipe_extensions' => $this->auction->snipe_extensions,
            ],
        ];
    }
}
