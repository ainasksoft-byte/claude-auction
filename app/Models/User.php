<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'open_id',
        'login_method',
        'role',
        'avatar_url',
        'tiktok_open_id',
        'tiktok_username',
        'tiktok_display_name',
        'tiktok_avatar_url',
        'tiktok_access_token',
        'tiktok_refresh_token',
        'tiktok_token_expires_at',
        'tiktok_follower_count',
        'tiktok_is_verified',
        'tiktok_profile_deep_link',
        'last_signed_in',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'tiktok_access_token',
        'tiktok_refresh_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'tiktok_token_expires_at' => 'datetime',
            'tiktok_is_verified' => 'boolean',
            'tiktok_follower_count' => 'integer',
            'last_signed_in' => 'datetime',
        ];
    }

    public function auctions()
    {
        return $this->hasMany(Auction::class, 'creator_id');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class, 'bidder_id');
    }

    public function savedAuctions()
    {
        return $this->belongsToMany(Auction::class, 'saved_auctions')->withTimestamps();
    }

    public function bidReminders()
    {
        return $this->hasMany(BidReminder::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function hasTiktokConnected(): bool
    {
        return !is_null($this->tiktok_open_id);
    }
}
