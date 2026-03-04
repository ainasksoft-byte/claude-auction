<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BoostCampaign extends Model
{
    protected $fillable = [
        'auction_id', 'user_id', 'boost_type', 'placement',
        'budget', 'spent', 'clicks', 'conversions', 'status',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'spent' => 'decimal:2',
    ];

    public function auction(): BelongsTo { return $this->belongsTo(Auction::class); }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}
