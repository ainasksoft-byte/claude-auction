<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuctionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BidController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\TikTokController;
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

    // Saved auctions
    Route::post('/auctions/{id}/save', [AuctionController::class, 'save']);
    Route::get('/auctions/{id}/is-saved', [AuctionController::class, 'isSaved']);
    Route::get('/me/saved-auctions', [AuctionController::class, 'saved']);
    Route::get('/me/auctions', [AuctionController::class, 'myAuctions']);
    Route::get('/me/bids', [AuctionController::class, 'myBids']);
    Route::get('/me/won', [AuctionController::class, 'wonAuctions']);

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
    });
});
