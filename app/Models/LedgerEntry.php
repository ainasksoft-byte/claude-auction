<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LedgerEntry extends Model
{
    protected $fillable = [
        'transaction_id', 'auction_id', 'buyer_id', 'seller_id',
        'product_name', 'winning_bid', 'platform_fee', 'net_payout', 'status',
    ];

    protected $casts = [
        'winning_bid' => 'decimal:2',
        'platform_fee' => 'decimal:2',
        'net_payout' => 'decimal:2',
    ];

    public function auction(): BelongsTo { return $this->belongsTo(Auction::class); }
    public function buyer(): BelongsTo { return $this->belongsTo(User::class, 'buyer_id'); }
    public function seller(): BelongsTo { return $this->belongsTo(User::class, 'seller_id'); }
}
