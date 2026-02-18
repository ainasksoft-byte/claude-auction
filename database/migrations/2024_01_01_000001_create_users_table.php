<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('open_id', 64)->unique()->nullable();
            $table->string('name')->nullable();
            $table->string('email', 320)->nullable();
            $table->string('login_method', 64)->nullable();
            $table->enum('role', ['user', 'admin'])->default('user');
            $table->text('avatar_url')->nullable();
            $table->string('tiktok_open_id', 255)->unique()->nullable();
            $table->string('tiktok_username', 255)->nullable();
            $table->string('tiktok_display_name', 255)->nullable();
            $table->text('tiktok_avatar_url')->nullable();
            $table->text('tiktok_access_token')->nullable();
            $table->text('tiktok_refresh_token')->nullable();
            $table->timestamp('tiktok_token_expires_at')->nullable();
            $table->integer('tiktok_follower_count')->nullable();
            $table->boolean('tiktok_is_verified')->default(false);
            $table->text('tiktok_profile_deep_link')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->timestamp('last_signed_in')->nullable();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
