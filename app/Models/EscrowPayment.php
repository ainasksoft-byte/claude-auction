<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EscrowPayment extends Model
{
    protected $fillable = [
        'auction_id', 'buyer_id', 'seller_id', 'amount', 'platform_fee',
        'seller_amount', 'status', 'payment_method', 'payment_intent_id', 'released_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'platform_fee' => 'decimal:2',
        'seller_amount' => 'decimal:2',
        'released_at' => 'datetime',
    ];

    public function auction(): BelongsTo { return $this->belongsTo(Auction::class); }
    public function buyer(): BelongsTo { return $this->belongsTo(User::class, 'buyer_id'); }
    public function seller(): BelongsTo { return $this->belongsTo(User::class, 'seller_id'); }
}
