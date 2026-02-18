<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BidReminder extends Model
{
    protected $fillable = ['user_id', 'auction_id', 'enabled'];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function auction()
    {
        return $this->belongsTo(Auction::class);
    }
}
