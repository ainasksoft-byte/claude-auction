<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TikTokController extends Controller
{
    public function connect(Request $request)
    {
        $clientKey = config('services.tiktok.client_key');
        $redirectUri = url('/api/tiktok/callback');
        $scope = 'user.info.basic,video.list';
        $state = encrypt($request->user()->id);

        $url = "https://www.tiktok.com/v2/auth/authorize?" . http_build_query([
            'client_key' => $clientKey,
            'redirect_uri' => $redirectUri,
            'scope' => $scope,
            'response_type' => 'code',
            'state' => $state,
        ]);

        return response()->json(['url' => $url]);
    }

    public function callback(Request $request)
    {
        $code = $request->query('code');
        $state = $request->query('state');

        if (!$code || !$state) {
            return redirect('/?error=tiktok_auth_failed');
        }

        try {
            $userId = decrypt($state);
        } catch (\Exception $e) {
            return redirect('/?error=invalid_state');
        }

        // Exchange code for access token
        $response = Http::post('https://open.tiktokapis.com/v2/oauth/token/', [
            'client_key' => config('services.tiktok.client_key'),
            'client_secret' => config('services.tiktok.client_secret'),
            'code' => $code,
            'grant_type' => 'authorization_code',
            'redirect_uri' => url('/api/tiktok/callback'),
        ]);

        if (!$response->successful()) {
            return redirect('/?error=tiktok_token_failed');
        }

        $tokenData = $response->json();

        // Get user info
        $userResponse = Http::withToken($tokenData['access_token'])
            ->get('https://open.tiktokapis.com/v2/user/info/', [
                'fields' => 'open_id,union_id,avatar_url,display_name,username,follower_count,is_verified,profile_deep_link',
            ]);

        $userData = $userResponse->json()['data']['user'] ?? [];

        $user = \App\Models\User::findOrFail($userId);
        $user->update([
            'tiktok_open_id' => $tokenData['open_id'] ?? $userData['open_id'] ?? null,
            'tiktok_username' => $userData['username'] ?? null,
            'tiktok_display_name' => $userData['display_name'] ?? null,
            'tiktok_avatar_url' => $userData['avatar_url'] ?? null,
            'tiktok_access_token' => encrypt($tokenData['access_token']),
            'tiktok_refresh_token' => isset($tokenData['refresh_token']) ? encrypt($tokenData['refresh_token']) : null,
            'tiktok_token_expires_at' => isset($tokenData['expires_in']) ? now()->addSeconds($tokenData['expires_in']) : null,
            'tiktok_follower_count' => $userData['follower_count'] ?? null,
            'tiktok_is_verified' => $userData['is_verified'] ?? false,
            'tiktok_profile_deep_link' => $userData['profile_deep_link'] ?? null,
        ]);

        return redirect('/me?tiktok=connected');
    }

    public function disconnect(Request $request)
    {
        $request->user()->update([
            'tiktok_open_id' => null,
            'tiktok_username' => null,
            'tiktok_display_name' => null,
            'tiktok_avatar_url' => null,
            'tiktok_access_token' => null,
            'tiktok_refresh_token' => null,
            'tiktok_token_expires_at' => null,
            'tiktok_follower_count' => null,
            'tiktok_is_verified' => false,
            'tiktok_profile_deep_link' => null,
        ]);

        return response()->json(['message' => 'TikTok account disconnected']);
    }

    public function videos(Request $request)
    {
        $user = $request->user();

        if (!$user->tiktok_access_token) {
            return response()->json(['message' => 'TikTok account not connected'], 422);
        }

        try {
            $accessToken = decrypt($user->tiktok_access_token);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid TikTok token'], 422);
        }

        $response = Http::withToken($accessToken)
            ->post('https://open.tiktokapis.com/v2/video/list/', [
                'max_count' => 20,
                'fields' => 'id,title,video_description,duration,cover_image_url,share_url,view_count,like_count,comment_count',
            ]);

        if (!$response->successful()) {
            return response()->json(['message' => 'Failed to fetch TikTok videos'], 500);
        }

        return response()->json($response->json()['data'] ?? []);
    }

    public function oembed(Request $request)
    {
        $url = $request->query('url');

        if (!$url) {
            return response()->json(['message' => 'URL is required'], 422);
        }

        $response = Http::get('https://www.tiktok.com/oembed', [
            'url' => $url,
        ]);

        if (!$response->successful()) {
            return response()->json(['message' => 'Failed to fetch oEmbed data'], 500);
        }

        return response()->json($response->json());
    }
}
