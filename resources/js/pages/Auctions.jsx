import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Clock, Flame, TrendingUp, X } from 'lucide-react';
import api from '../lib/api';
import { formatPrice, formatTimeRemaining } from '../lib/utils';
import { useCountdown } from '../hooks/useCountdown';
import { useAuth } from '../hooks/useAuth';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Sneakers', 'Luxury', 'Gaming', 'Collectibles', 'Home', 'Mystery Boxes'];

function MiniAuctionCard({ auction }) {
    const navigate = useNavigate();
    const { timeRemaining, isUrgent } = useCountdown(auction.end_time);
    const isLive = auction.status === 'live' || auction.status === 'ending_soon';

    return (
        <div onClick={() => navigate(`/auction/${auction.id}`)}
            className="bg-[#111] rounded-2xl border border-[#1F1F1F] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
            <div className="relative aspect-square bg-[#0a0a0a]">
                {auction.images?.[0] ? (
                    <img src={auction.images[0].url} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FE2C55]/10 to-[#25F4EE]/10">
                        <Flame className="w-8 h-8 text-[#FE2C55]/40" />
                    </div>
                )}
                <div className={`absolute top-2 left-2 ${auction.status === 'live' ? 'bg-green-500' : auction.status === 'ending_soon' ? 'bg-[#FE2C55]' : 'bg-[#25F4EE]'} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase`}>
                    {auction.status === 'live' ? 'LIVE' : auction.status?.replace('_', ' ').toUpperCase()}
                </div>
                {isLive && (
                    <div className={`absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded-full text-[10px] font-mono ${isUrgent ? 'text-[#FE2C55]' : 'text-white'}`}>
                        {formatTimeRemaining(timeRemaining)}
                    </div>
                )}
            </div>
            <div className="p-3">
                <p className="text-sm font-semibold line-clamp-1">{auction.title}</p>
                <div className="flex items-center justify-between mt-1.5">
                    <p className="text-base font-bold text-[#25F4EE]">{formatPrice(auction.current_bid || auction.starting_bid || 0)}</p>
                    <p className="text-xs text-[#AAA]">{auction.bid_count || 0} bids</p>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#222] flex items-center justify-center text-[8px]">
                        {auction.creator?.name?.[0] || '?'}
                    </div>
                    <span className="text-xs text-[#AAA] truncate">@{auction.creator?.tiktok_username || auction.creator?.name}</span>
                </div>
            </div>
        </div>
    );
}

export default function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [status, setStatus] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadAuctions(); }, [category, status]);

    const loadAuctions = async () => {
        try {
            setLoading(true);
            const params = { per_page: 50 };
            if (category !== 'All') params.category = category;
            if (status) params.status = status;
            if (search) params.search = search;
            const { data } = await api.get('/auctions', { params });
            setAuctions(data.data || data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadAuctions();
    };

    return (
        <div className="tiktok-container bg-black min-h-screen pb-20">
            {/* Search Header */}
            <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#1F1F1F] px-4 py-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA]" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#FE2C55]"
                            placeholder="Search auctions..."
                        />
                    </div>
                    <button type="button" onClick={() => setShowFilters(!showFilters)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${showFilters ? 'bg-[#FE2C55]' : 'bg-[#111] border border-[#1F1F1F]'}`}>
                        <SlidersHorizontal className="w-4 h-4" />
                    </button>
                </form>

                {/* Category Pills */}
                <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${category === cat ? 'bg-[#FE2C55] text-white' : 'bg-[#111] border border-[#1F1F1F] text-[#AAA]'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Status filters */}
                {showFilters && (
                    <div className="flex gap-2 mt-3 fade-in">
                        {['', 'live', 'ending_soon', 'upcoming', 'ended'].map(s => (
                            <button key={s} onClick={() => setStatus(s)}
                                className={`px-3 py-1.5 rounded-full text-xs ${status === s ? 'bg-[#25F4EE] text-black font-bold' : 'bg-[#111] border border-[#1F1F1F] text-[#AAA]'}`}>
                                {s ? s.replace('_', ' ') : 'All Status'}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#FE2C55] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : auctions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#AAA]">
                    <Search className="w-12 h-12 mb-3 text-[#333]" />
                    <p className="text-sm">No auctions found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 px-4 py-4">
                    {auctions.map(a => <MiniAuctionCard key={a.id} auction={a} />)}
                </div>
            )}
        </div>
    );
}
