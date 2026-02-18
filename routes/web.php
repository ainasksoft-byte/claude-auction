<?php

use Illuminate\Support\Facades\Route;

// API routes are in api.php
// All other routes serve the React SPA
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
