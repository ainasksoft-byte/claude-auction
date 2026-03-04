<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_seller')->default(false)->after('role');
            $table->boolean('seller_verified')->default(false)->after('is_seller');
            $table->decimal('seller_rating', 3, 2)->default(0)->after('seller_verified');
            $table->integer('total_auctions_completed')->default(0)->after('seller_rating');
            $table->string('seller_status', 32)->default('inactive')->after('total_auctions_completed'); // active, suspended, banned
            $table->string('payout_method', 32)->nullable()->after('seller_status');
            $table->string('stripe_connect_id', 255)->nullable()->after('payout_method');
            $table->string('paypal_email', 320)->nullable()->after('stripe_connect_id');
            $table->text('bank_details')->nullable()->after('paypal_email');
            $table->string('location', 255)->nullable()->after('bank_details');
        });

        Schema::table('auctions', function (Blueprint $table) {
            $table->string('condition', 64)->default('new')->after('category');
            $table->decimal('retail_price', 10, 2)->nullable()->after('condition');
            $table->decimal('starting_bid', 10, 2)->default(1.00)->after('retail_price');
            $table->decimal('bid_increment', 10, 2)->default(1.00)->after('starting_bid');
            $table->integer('bid_count')->default(0)->after('bid_increment');
            $table->integer('view_count')->default(0)->after('bid_count');
            $table->integer('like_count')->default(0)->after('view_count');
            $table->integer('share_count')->default(0)->after('like_count');
            $table->integer('fraud_score')->default(0)->after('share_count');
            $table->foreignId('winner_id')->nullable()->constrained('users')->nullOnDelete()->after('fraud_score');
            $table->decimal('winning_bid', 10, 2)->nullable()->after('winner_id');
        });

        // Wallets
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('available_balance', 12, 2)->default(0);
            $table->decimal('pending_balance', 12, 2)->default(0);
            $table->decimal('withdrawn_amount', 12, 2)->default(0);
            $table->decimal('platform_fees_paid', 12, 2)->default(0);
            $table->timestamps();
        });

        // Payout requests
        Schema::create('payout_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->string('payout_method', 32);
            $table->enum('status', ['pending', 'processing', 'completed', 'rejected'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();
        });

        // Financial ledger
        Schema::create('ledger_entries', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id', 64)->unique();
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->string('product_name', 255);
            $table->decimal('winning_bid', 12, 2);
            $table->decimal('platform_fee', 12, 2);
            $table->decimal('net_payout', 12, 2);
            $table->enum('status', ['pending', 'escrow', 'released', 'refunded', 'disputed'])->default('pending');
            $table->timestamps();
        });

        // Escrow
        Schema::create('escrow_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->decimal('platform_fee', 12, 2);
            $table->decimal('seller_amount', 12, 2);
            $table->enum('status', ['held', 'released', 'refunded', 'disputed'])->default('held');
            $table->string('payment_method', 32)->nullable();
            $table->string('payment_intent_id', 255)->nullable();
            $table->timestamp('released_at')->nullable();
            $table->timestamps();
        });

        // Auto bids
        Schema::create('auto_bids', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->decimal('max_amount', 12, 2);
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->unique(['user_id', 'auction_id']);
        });

        // Auction likes
        Schema::create('auction_likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['user_id', 'auction_id']);
        });

        // Auction comments
        Schema::create('auction_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->text('content');
            $table->boolean('reported')->default(false);
            $table->timestamps();
        });

        // Boost campaigns
        Schema::create('boost_campaigns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('boost_type', ['video', 'listing', 'profile']);
            $table->enum('placement', ['for_you', 'shop', 'creator_discovery']);
            $table->decimal('budget', 10, 2);
            $table->decimal('spent', 10, 2)->default(0);
            $table->integer('clicks')->default(0);
            $table->integer('conversions')->default(0);
            $table->enum('status', ['active', 'paused', 'completed', 'rejected'])->default('active');
            $table->timestamps();
        });

        // Fraud reports
        Schema::create('fraud_reports', function (Blueprint $table) {
            $table->id();
            $table->string('reportable_type', 100);
            $table->unsignedBigInteger('reportable_id');
            $table->foreignId('reporter_id')->constrained('users')->onDelete('cascade');
            $table->string('reason', 255);
            $table->text('details')->nullable();
            $table->enum('status', ['pending', 'reviewed', 'resolved', 'dismissed'])->default('pending');
            $table->timestamps();
        });

        // Admin audit logs
        Schema::create('admin_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->constrained('users')->onDelete('cascade');
            $table->string('action', 255);
            $table->string('target_type', 100)->nullable();
            $table->unsignedBigInteger('target_id')->nullable();
            $table->text('details')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });

        // Platform settings
        Schema::create('platform_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->text('value');
            $table->timestamps();
        });

        // Orders (for buyer tracking)
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');
            $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
            $table->decimal('amount', 12, 2);
            $table->enum('status', ['pending_payment', 'paid', 'shipped', 'delivered', 'disputed', 'refunded'])->default('pending_payment');
            $table->string('tracking_number', 255)->nullable();
            $table->string('shipping_carrier', 100)->nullable();
            $table->text('shipping_address')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
        Schema::dropIfExists('platform_settings');
        Schema::dropIfExists('admin_audit_logs');
        Schema::dropIfExists('fraud_reports');
        Schema::dropIfExists('boost_campaigns');
        Schema::dropIfExists('auction_comments');
        Schema::dropIfExists('auction_likes');
        Schema::dropIfExists('auto_bids');
        Schema::dropIfExists('escrow_payments');
        Schema::dropIfExists('ledger_entries');
        Schema::dropIfExists('payout_requests');
        Schema::dropIfExists('wallets');

        Schema::table('auctions', function (Blueprint $table) {
            $table->dropForeign(['winner_id']);
            $table->dropColumn([
                'condition', 'retail_price', 'starting_bid', 'bid_increment',
                'bid_count', 'view_count', 'like_count', 'share_count',
                'fraud_score', 'winner_id', 'winning_bid',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'is_seller', 'seller_verified', 'seller_rating',
                'total_auctions_completed', 'seller_status', 'payout_method',
                'stripe_connect_id', 'paypal_email', 'bank_details', 'location',
            ]);
        });
    }
};
