<?php

use Illuminate\Support\Facades\Schedule;

// Run auction status transitions every 10 seconds
Schedule::command('auctions:transition')->everyTenSeconds();
