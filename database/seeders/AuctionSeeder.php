<?php

namespace Database\Seeders;

use App\Models\Auction;
use App\Models\AuctionImage;
use App\Models\User;
use Illuminate\Database\Seeder;

class AuctionSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@auctioneer.io'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'login_method' => 'email',
                'last_signed_in' => now(),
            ]
        );

        // Create demo user
        $demoUser = User::firstOrCreate(
            ['email' => 'demo@auctioneer.io'],
            [
                'name' => 'Demo User',
                'password' => bcrypt('password'),
                'role' => 'user',
                'login_method' => 'email',
                'last_signed_in' => now(),
            ]
        );

        $auctions = [
            [
                'title' => 'Aston Martin DB11',
                'description' => 'A stunning Aston Martin DB11 in pristine condition. This luxury grand tourer features a twin-turbocharged V8 engine, hand-crafted interior with premium leather, and the iconic Aston Martin design language. Only 15,000 miles on the odometer. Full service history included.',
                'category' => 'Automotive',
                'current_bid' => 50000,
                'reserve_price' => 120000,
                'start_time' => now()->subHours(2),
                'end_time' => now()->addDays(3),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
                    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
                ],
            ],
            [
                'title' => 'Rolex Submariner Date',
                'description' => 'Authentic Rolex Submariner Date ref. 126610LN. Black dial, 41mm case, Oystersteel bracelet. Comes with box, papers, and warranty card dated 2023. Excellent condition with minimal wear.',
                'category' => 'Watches',
                'current_bid' => 8000,
                'reserve_price' => 12000,
                'start_time' => now()->subHours(5),
                'end_time' => now()->addDays(2),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800',
                    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
                ],
                'tiktok_video_url' => 'https://www.tiktok.com/@rolex/video/7299382847302',
            ],
            [
                'title' => 'MacBook Pro M3 Max',
                'description' => 'Apple MacBook Pro 16-inch with M3 Max chip, 48GB unified memory, 1TB SSD. Space Black finish. AppleCare+ until 2026. Barely used, in perfect condition with original packaging.',
                'category' => 'Electronics',
                'current_bid' => 2500,
                'reserve_price' => 3200,
                'start_time' => now()->subHours(1),
                'end_time' => now()->addDays(1),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
                    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
                ],
            ],
            [
                'title' => 'Vintage Leather Jacket',
                'description' => 'Authentic vintage Italian leather jacket from the 1970s. Premium full-grain leather with beautiful patina. Size Medium. Features classic motorcycle-style design with zippered pockets and snap collar.',
                'category' => 'Fashion',
                'current_bid' => 150,
                'reserve_price' => 500,
                'start_time' => now()->addHours(6),
                'end_time' => now()->addDays(5),
                'status' => 'upcoming',
                'images' => [
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
                ],
            ],
            [
                'title' => 'Sony A7R V Camera',
                'description' => 'Sony Alpha A7R V full-frame mirrorless camera body. 61MP sensor, 8K video capability, advanced AI autofocus. Includes two batteries, charger, and camera bag. Shutter count under 5000.',
                'category' => 'Photography',
                'current_bid' => 3800,
                'reserve_price' => null,
                'start_time' => now()->subHours(12),
                'end_time' => now()->addHours(8),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
                    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
                ],
                'tiktok_video_url' => 'https://www.tiktok.com/@sony/video/7312847293841',
            ],
            [
                'title' => 'Gaming PC RTX 4090',
                'description' => 'Custom-built gaming PC featuring NVIDIA RTX 4090, Intel i9-14900K, 64GB DDR5 RAM, 2TB NVMe SSD. Custom water cooling loop with RGB lighting. Lian Li O11 Dynamic case.',
                'category' => 'Gaming',
                'current_bid' => 2200,
                'reserve_price' => 3500,
                'start_time' => now()->subHours(3),
                'end_time' => now()->addMinutes(4),
                'status' => 'ending_soon',
                'images' => [
                    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
                    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
                ],
            ],
            [
                'title' => 'Hermès Birkin Bag',
                'description' => 'Authentic Hermès Birkin 25 in Togo leather, Gold hardware, Etoupe color. Comes with full set: box, dust bag, lock, keys, clochette, rain cover, and receipt. Pristine condition.',
                'category' => 'Luxury',
                'current_bid' => 15000,
                'reserve_price' => 25000,
                'start_time' => now()->addDays(1),
                'end_time' => now()->addDays(7),
                'status' => 'upcoming',
                'images' => [
                    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
                ],
            ],
            [
                'title' => 'Rolex Daytona',
                'description' => 'Rolex Cosmograph Daytona ref. 116500LN with white dial. Stainless steel, ceramic bezel. Complete set with box and papers. 2022 purchase. Unworn condition.',
                'category' => 'Watches',
                'current_bid' => 25000,
                'reserve_price' => 35000,
                'start_time' => now()->subHours(8),
                'end_time' => now()->addDays(4),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800',
                    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
                ],
                'tiktok_video_url' => 'https://www.tiktok.com/@watches/video/7289474839201',
            ],
            [
                'title' => 'Tesla Model S Plaid',
                'description' => 'Tesla Model S Plaid in Pearl White Multi-Coat. Full Self-Driving capability, 21" Arachnid wheels, black interior. Only 8,000 miles. 0-60 in 1.99 seconds. Includes all charging accessories.',
                'category' => 'Automotive',
                'current_bid' => 80000,
                'reserve_price' => 95000,
                'start_time' => now()->subDays(1),
                'end_time' => now()->addDays(6),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
                    'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800',
                ],
            ],
            [
                'title' => 'iPhone 15 Pro Max',
                'description' => 'Apple iPhone 15 Pro Max 1TB in Natural Titanium. Factory unlocked, AppleCare+ until 2025. Includes MagSafe charger, original box, and premium leather case. Battery health 100%.',
                'category' => 'Electronics',
                'current_bid' => 1200,
                'reserve_price' => 1500,
                'start_time' => now()->subHours(6),
                'end_time' => now()->addDays(2),
                'status' => 'live',
                'images' => [
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
                    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
                ],
            ],
        ];

        foreach ($auctions as $auctionData) {
            $images = $auctionData['images'] ?? [];
            $tiktokVideoUrl = $auctionData['tiktok_video_url'] ?? null;
            unset($auctionData['images'], $auctionData['tiktok_video_url']);

            $auction = Auction::create(array_merge($auctionData, [
                'creator_id' => $admin->id,
                'tiktok_video_url' => $tiktokVideoUrl,
            ]));

            foreach ($images as $index => $imageUrl) {
                AuctionImage::create([
                    'auction_id' => $auction->id,
                    'url' => $imageUrl,
                    'display_order' => $index,
                ]);
            }
        }
    }
}
