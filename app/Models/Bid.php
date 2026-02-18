<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    protected $fillable = ['auction_id', 'bidder_id', 'amount', 'triggered_anti_snipe'];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'triggered_anti_snipe' => 'boolean',
        ];
    }

    public function auction()
    {
        return $this->belongsTo(Auction::class);
    }

    public function bidder()
    {
        return $this->belongsTo(User::class, 'bidder_id');
    }
}
