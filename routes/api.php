<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuctionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BidController;
use App\Http\Controllers\Api\BoostController;
use App\Http\Controllers\Api\EngagementController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TikTokController;
use App\Http\Controllers\Api\WalletController;
use Illuminate\Support\Facades\Route;

// Public auth routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Public auction routes
Route::get('/auctions', [AuctionController::class, 'index']);
Route::get('/auctions/categories', [AuctionController::class, 'categories']);
Route::get('/auctions/{id}', [AuctionController::class, 'show']);
Route::get('/auctions/{id}/similar', [AuctionController::class, 'similar']);
Route::get('/auctions/{id}/bids', [BidController::class, 'history']);
Route::get('/auctions/{id}/comments', [EngagementController::class, 'comments']);

// TikTok oEmbed (public)
Route::get('/tiktok/oembed', [TikTokController::class, 'oembed']);
Route::get('/tiktok/callback', [TikTokController::class, 'callback']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Auction management
    Route::post('/auctions', [AuctionController::class, 'store']);
    Route::put('/auctions/{id}', [AuctionController::class, 'update']);
    Route::delete('/auctions/{id}', [AuctionController::class, 'destroy']);
    Route::post('/auctions/upload-images', [AuctionController::class, 'uploadImages']);

    // Bidding
    Route::post('/auctions/{id}/bid', [BidController::class, 'store']);
    Route::post('/auctions/{id}/reminder', [BidController::class, 'toggleReminder']);
    Route::get('/auctions/{id}/reminder', [BidController::class, 'reminderStatus']);

    // Auto-bidding
    Route::post('/auctions/{id}/auto-bid', [EngagementController::class, 'setAutoBid']);
    Route::delete('/auctions/{id}/auto-bid', [EngagementController::class, 'cancelAutoBid']);

    // Engagement
    Route::post('/auctions/{id}/like', [EngagementController::class, 'toggleLike']);
    Route::get('/auctions/{id}/is-liked', [EngagementController::class, 'isLiked']);
    Route::post('/auctions/{id}/comment', [EngagementController::class, 'addComment']);
    Route::post('/auctions/{id}/share', [EngagementController::class, 'share']);

    // Saved auctions
    Route::post('/auctions/{id}/save', [AuctionController::class, 'save']);
    Route::get('/auctions/{id}/is-saved', [AuctionController::class, 'isSaved']);
    Route::get('/me/saved-auctions', [AuctionController::class, 'saved']);
    Route::get('/me/auctions', [AuctionController::class, 'myAuctions']);
    Route::get('/me/bids', [AuctionController::class, 'myBids']);
    Route::get('/me/won', [AuctionController::class, 'wonAuctions']);

    // Wallet & Payouts
    Route::get('/wallet', [WalletController::class, 'show']);
    Route::get('/wallet/ledger', [WalletController::class, 'ledger']);
    Route::post('/wallet/payout', [WalletController::class, 'requestPayout']);
    Route::get('/wallet/payouts', [WalletController::class, 'payoutHistory']);

    // Orders
    Route::get('/orders/buying', [OrderController::class, 'buyerOrders']);
    Route::get('/orders/selling', [OrderController::class, 'sellerOrders']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}/shipping', [OrderController::class, 'updateShipping']);
    Route::put('/orders/{id}/confirm-delivery', [OrderController::class, 'confirmDelivery']);

    // Boost campaigns
    Route::post('/boost', [BoostController::class, 'create']);
    Route::get('/boost/campaigns', [BoostController::class, 'myCampaigns']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markRead']);
    Route::put('/notifications/read-all', [NotificationController::class, 'markAllRead']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);

    // TikTok
    Route::get('/tiktok/connect', [TikTokController::class, 'connect']);
    Route::post('/tiktok/disconnect', [TikTokController::class, 'disconnect']);
    Route::get('/tiktok/videos', [TikTokController::class, 'videos']);

    // Admin
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/users', [AdminController::class, 'users']);
        Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
        Route::get('/auctions', [AdminController::class, 'allAuctions']);
        Route::post('/auctions/{id}/end', [AdminController::class, 'endAuctionEarly']);
        Route::post('/auctions/{id}/pause', [AdminController::class, 'pauseAuction']);
        Route::post('/auctions/{id}/extend', [AdminController::class, 'extendAuction']);
        Route::put('/sellers/{id}/status', [AdminController::class, 'updateSellerStatus']);
        Route::get('/payments', [AdminController::class, 'payments']);
        Route::put('/payouts/{id}', [AdminController::class, 'updatePayout']);
        Route::get('/boost-campaigns', [AdminController::class, 'boostCampaigns']);
        Route::put('/boost-campaigns/{id}', [AdminController::class, 'updateBoostCampaign']);
        Route::get('/fraud-reports', [AdminController::class, 'fraudReports']);
        Route::put('/fraud-reports/{id}', [AdminController::class, 'updateFraudReport']);
        Route::get('/audit-logs', [AdminController::class, 'auditLogs']);
        Route::get('/settings', [AdminController::class, 'settings']);
        Route::put('/settings', [AdminController::class, 'updateSettings']);
    });
});
