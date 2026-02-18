import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import AuctionCard from '../components/AuctionCard';
import api from '../lib/api';

export default function Home() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [featuredAuctions, setFeaturedAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const { data } = await api.get('/auctions', { params: { status: 'live' } });
                setFeaturedAuctions((data.data || data).slice(0, 6));
            } catch (err) {
                console.error('Failed to fetch auctions:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAuctions();
    }, []);

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className={`px-6 pt-16 pb-12 ${isDark ? 'bg-gradient-to-br from-[#0f0f0f] via-[#1a0a1a] to-[#0f0f0f]' : 'bg-gradient-to-br from-white via-pink-50 to-white'}`}>
                    <div className="max-w-lg mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                            <span className="bg-gradient-to-r from-tiktok-red via-tiktok-pink to-tiktok-cyan bg-clip-text text-transparent">
                                Bid. Win.
                            </span>
                            <br />
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>Own It.</span>
                        </h1>
                        <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Real-time auctions with TikTok integration. Find unique items, place your bids, and win big.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => navigate('/auctions')}
                                className="px-6 py-3 bg-tiktok-red text-white font-bold rounded-xl hover:bg-red-600 transition"
                            >
                                Explore Auctions
                            </button>
                            <button
                                onClick={() => navigate('/create')}
                                className={`px-6 py-3 font-bold rounded-xl border-2 transition ${
                                    isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Create Auction
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-tiktok-red/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-tiktok-cyan/10 rounded-full blur-xl"></div>
            </div>

            {/* Stats Bar */}
            <div className={`px-6 py-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto flex justify-around text-center">
                    <div>
                        <p className="text-tiktok-red font-bold text-xl">{featuredAuctions.length}+</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Live Auctions</p>
                    </div>
                    <div>
                        <p className="text-tiktok-cyan font-bold text-xl">24/7</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Real-time Bidding</p>
                    </div>
                    <div>
                        <p className="text-tiktok-pink font-bold text-xl">Anti-Snipe</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Protected</p>
                    </div>
                </div>
            </div>

            {/* Featured Auctions */}
            <div className="px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Trending Auctions
                        </h2>
                        <button
                            onClick={() => navigate('/auctions')}
                            className="text-tiktok-red text-sm font-semibold hover:underline"
                        >
                            See All
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className={`rounded-2xl aspect-[3/4] animate-pulse ${isDark ? 'bg-[#262626]' : 'bg-gray-200'}`}></div>
                            ))}
                        </div>
                    ) : featuredAuctions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredAuctions.map(auction => (
                                <AuctionCard key={auction.id} auction={auction} />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No live auctions right now</p>
                            <button onClick={() => navigate('/create')} className="mt-4 px-6 py-2 bg-tiktok-red text-white rounded-xl text-sm font-bold">
                                Create the First One
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* How it works */}
            <div className={`px-6 py-12 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: '1', title: 'Browse & Discover', desc: 'Find unique items from live and upcoming auctions' },
                            { step: '2', title: 'Place Your Bid', desc: 'Bid in real-time with anti-snipe protection' },
                            { step: '3', title: 'Win & Celebrate', desc: 'Win the auction and claim your prize' },
                        ].map(item => (
                            <div key={item.step} className={`rounded-xl p-6 text-center ${isDark ? 'bg-[#262626]' : 'bg-white shadow-sm'}`}>
                                <div className="w-10 h-10 bg-tiktok-red text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
