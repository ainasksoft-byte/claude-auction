<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class FraudReport extends Model
{
    protected $fillable = ['reportable_type', 'reportable_id', 'reporter_id', 'reason', 'details', 'status'];

    public function reportable(): MorphTo { return $this->morphTo(); }
    public function reporter(): BelongsTo { return $this->belongsTo(User::class, 'reporter_id'); }
}
