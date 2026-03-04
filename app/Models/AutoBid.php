<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AutoBid extends Model
{
    protected $fillable = ['user_id', 'auction_id', 'max_amount', 'active'];

    protected $casts = ['max_amount' => 'decimal:2', 'active' => 'boolean'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function auction(): BelongsTo { return $this->belongsTo(Auction::class); }
}
