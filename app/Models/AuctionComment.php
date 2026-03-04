<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuctionComment extends Model
{
    protected $fillable = ['user_id', 'auction_id', 'content', 'reported'];

    protected $casts = ['reported' => 'boolean'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function auction(): BelongsTo { return $this->belongsTo(Auction::class); }
}
