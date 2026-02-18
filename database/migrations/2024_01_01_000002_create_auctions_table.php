<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auctions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('creator_id')->constrained('users')->onDelete('cascade');
            $table->string('title', 255);
            $table->text('description');
            $table->string('category', 100);
            $table->decimal('current_bid', 10, 2)->default(0);
            $table->decimal('reserve_price', 10, 2)->nullable();
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->enum('status', ['upcoming', 'live', 'ending_soon', 'ended'])->default('upcoming');
            $table->integer('anti_snipe_seconds')->default(300);
            $table->integer('snipe_extensions')->default(0);
            $table->text('tiktok_video_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auctions');
    }
};
