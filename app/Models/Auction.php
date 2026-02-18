<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'title',
        'description',
        'category',
        'current_bid',
        'reserve_price',
        'start_time',
        'end_time',
        'status',
        'anti_snipe_seconds',
        'snipe_extensions',
        'tiktok_video_url',
    ];

    protected function casts(): array
    {
        return [
            'current_bid' => 'decimal:2',
            'reserve_price' => 'decimal:2',
            'start_time' => 'datetime',
            'end_time' => 'datetime',
            'anti_snipe_seconds' => 'integer',
            'snipe_extensions' => 'integer',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function images()
    {
        return $this->hasMany(AuctionImage::class)->orderBy('display_order');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class)->orderBy('amount', 'desc');
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_auctions')->withTimestamps();
    }

    public function bidReminders()
    {
        return $this->hasMany(BidReminder::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function highestBid()
    {
        return $this->hasOne(Bid::class)->orderBy('amount', 'desc');
    }

    public function isLive(): bool
    {
        return $this->status === 'live' || $this->status === 'ending_soon';
    }

    public function isEnded(): bool
    {
        return $this->status === 'ended';
    }

    public function hasTiktokVideo(): bool
    {
        return !is_null($this->tiktok_video_url);
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }
}
