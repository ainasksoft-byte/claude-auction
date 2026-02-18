<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bid_reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->boolean('enabled')->default(true);
            $table->timestamps();
            $table->unique(['user_id', 'auction_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bid_reminders');
    }
};
