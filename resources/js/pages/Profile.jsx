import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import AuctionCard from '../components/AuctionCard';
import api from '../lib/api';
import { toast } from '../components/ui/Toaster';

export default function Profile() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('bids');
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                let endpoint;
                switch (activeTab) {
                    case 'bids': endpoint = '/me/bids'; break;
                    case 'won': endpoint = '/me/won'; break;
                    case 'created': endpoint = '/me/auctions'; break;
                    case 'saved': endpoint = '/me/saved-auctions'; break;
                    default: endpoint = '/me/bids';
                }
                const { data } = await api.get(endpoint);
                setAuctions(data.data || data);
            } catch (err) {
                console.error('Failed to fetch:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeTab, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pb-20 px-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-[#262626]' : 'bg-gray-200'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={isDark ? 'text-gray-500' : 'text-gray-400'}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome to Auction IO</h2>
                <p className={`text-sm mb-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sign in to manage your auctions, bids, and more.</p>
                <div className="flex gap-3">
                    <button onClick={() => navigate('/login')} className="px-6 py-3 bg-tiktok-red text-white font-bold rounded-xl">Sign In</button>
                    <button onClick={() => navigate('/register')} className={`px-6 py-3 font-bold rounded-xl border-2 ${isDark ? 'border-white/20 text-white' : 'border-gray-300 text-gray-700'}`}>Register</button>
                </div>
            </div>
        );
    }

    const handleConnectTikTok = async () => {
        try {
            const { data } = await api.get('/tiktok/connect');
            window.location.href = data.url;
        } catch (err) {
            toast('Failed to connect TikTok', 'error');
        }
    };

    const handleDisconnectTikTok = async () => {
        try {
            await api.post('/tiktok/disconnect');
            toast('TikTok disconnected', 'success');
            window.location.reload();
        } catch (err) {
            toast('Failed to disconnect TikTok', 'error');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const tabs = [
        { key: 'bids', label: 'Active Bids' },
        { key: 'won', label: 'Won' },
        { key: 'created', label: 'Created' },
        { key: 'saved', label: 'Saved' },
    ];

    return (
        <div className="pb-20">
            {/* Profile Header */}
            <div className={`px-4 pt-8 pb-6 ${isDark ? 'bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]' : 'bg-gradient-to-b from-gray-100 to-white'}`}>
                <div className="max-w-lg mx-auto text-center">
                    <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold ${isDark ? 'bg-[#262626] text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {user.avatar_url ? (
                            <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user.name?.[0]?.toUpperCase() || '?'
                        )}
                    </div>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>

                    {/* TikTok Info */}
                    {user.tiktok_open_id ? (
                        <div className="mt-3">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="text-sm text-tiktok-cyan font-medium">@{user.tiktok_username || 'TikTok Connected'}</span>
                                {user.tiktok_is_verified && (
                                    <span className="px-1.5 py-0.5 bg-tiktok-cyan text-white text-[10px] font-bold rounded">Verified</span>
                                )}
                            </div>
                            {user.tiktok_follower_count !== null && (
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{user.tiktok_follower_count?.toLocaleString()} followers</p>
                            )}
                            <button onClick={handleDisconnectTikTok} className="mt-2 px-4 py-1.5 text-xs text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10">
                                Disconnect TikTok
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleConnectTikTok} className="mt-3 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800">
                            Connect TikTok
                        </button>
                    )}

                    <div className="mt-4 flex justify-center gap-3">
                        {user.role === 'admin' && (
                            <button onClick={() => navigate('/admin')} className={`px-4 py-2 text-sm font-medium rounded-lg ${isDark ? 'bg-[#262626] text-white' : 'bg-gray-100 text-gray-700'}`}>
                                Admin Panel
                            </button>
                        )}
                        <button onClick={handleLogout} className={`px-4 py-2 text-sm font-medium rounded-lg ${isDark ? 'bg-[#262626] text-red-400' : 'bg-gray-100 text-red-500'}`}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={`border-b ${isDark ? 'border-[#262626]' : 'border-gray-200'}`}>
                <div className="max-w-lg mx-auto flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition ${
                                activeTab === tab.key
                                    ? 'border-tiktok-red text-tiktok-red'
                                    : `border-transparent ${isDark ? 'text-gray-400' : 'text-gray-500'}`
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 py-4">
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className={`rounded-2xl aspect-[3/4] animate-pulse ${isDark ? 'bg-[#262626]' : 'bg-gray-200'}`}></div>
                            ))}
                        </div>
                    ) : auctions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {auctions.map(auction => (
                                <AuctionCard key={auction.id} auction={auction} />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {activeTab === 'bids' && 'No active bids yet'}
                                {activeTab === 'won' && 'No auctions won yet'}
                                {activeTab === 'created' && 'No auctions created yet'}
                                {activeTab === 'saved' && 'No saved auctions yet'}
                            </p>
                            <button onClick={() => navigate('/auctions')} className="mt-3 text-tiktok-red text-sm font-semibold hover:underline">
                                Browse Auctions
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
