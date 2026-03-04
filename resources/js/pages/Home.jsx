import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, Play, Eye, ChevronUp, Flame, Clock, Zap } from 'lucide-react';
import api from '../lib/api';
import { formatPrice, formatTimeRemaining } from '../lib/utils';
import { useCountdown } from '../hooks/useCountdown';
import { useAuth } from '../hooks/useAuth';

function AuctionFeedCard({ auction, onBid, onSave, onLike }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { timeRemaining, isUrgent } = useCountdown(auction.end_time);
    const [bidAmount, setBidAmount] = useState('');
    const [showBidInput, setShowBidInput] = useState(false);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const minBid = parseFloat(auction.current_bid || auction.starting_bid || 1) + parseFloat(auction.bid_increment || 1);

    const handleBid = () => {
        if (!user) { navigate('/login'); return; }
        if (!showBidInput) { setShowBidInput(true); setBidAmount(minBid.toFixed(2)); return; }
        if (parseFloat(bidAmount) >= minBid) {
            onBid(auction.id, parseFloat(bidAmount));
            setShowBidInput(false);
        }
    };

    const statusColor = auction.status === 'live' ? 'bg-green-500' :
        auction.status === 'ending_soon' ? 'bg-[#FE2C55]' : 'bg-[#25F4EE]';

    return (
        <div className="relative w-full bg-black flex flex-col" style={{ minHeight: 'calc(100vh - 64px)' }}>
            {/* Video/Image Area */}
            <div className="relative flex-1 bg-[#111] flex items-center justify-center cursor-pointer"
                 onClick={() => navigate(`/auction/${auction.id}`)}>
                {auction.tiktok_video_url ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#111] to-[#000]">
                        <Play className="w-16 h-16 text-white/60" />
                        <span className="absolute bottom-4 left-4 text-xs text-white/60">Tap to view full auction</span>
                    </div>
                ) : auction.images?.[0] ? (
                    <img src={auction.images[0].url} alt={auction.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#FE2C55]/20 to-[#25F4EE]/20 flex items-center justify-center">
                        <Flame className="w-16 h-16 text-[#FE2C55]" />
                    </div>
                )}

                {/* Status Badge */}
                <div className={`absolute top-4 left-4 ${statusColor} px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1`}>
                    {auction.status === 'live' && <span className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                    {auction.status === 'live' ? 'LIVE' : auction.status === 'ending_soon' ? 'ENDING SOON' : auction.status?.toUpperCase()}
                </div>

                {/* Timer */}
                {(auction.status === 'live' || auction.status === 'ending_soon') && (
                    <div className={`absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-mono ${isUrgent ? 'text-[#FE2C55] countdown-urgent' : 'text-white'}`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {formatTimeRemaining(timeRemaining)}
                    </div>
                )}

                {/* Bid Count */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white">
                    {auction.bid_count || 0} bids
                </div>
            </div>

            {/* Right Side Actions (TikTok style) */}
            <div className="absolute right-3 bottom-48 flex flex-col items-center gap-5 z-10">
                {/* Seller Avatar */}
                <div className="relative" onClick={() => navigate(`/auction/${auction.id}`)}>
                    <div className="w-12 h-12 rounded-full border-2 border-[#FE2C55] overflow-hidden bg-[#222]">
                        {auction.creator?.avatar_url || auction.creator?.tiktok_avatar_url ? (
                            <img src={auction.creator.tiktok_avatar_url || auction.creator.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white">
                                {auction.creator?.name?.[0] || '?'}
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FE2C55] rounded-full flex items-center justify-center text-[10px] font-bold">+</div>
                </div>

                {/* Like */}
                <button onClick={() => { setLiked(!liked); onLike?.(auction.id); }} className="flex flex-col items-center">
                    <Heart className={`w-7 h-7 ${liked ? 'fill-[#FE2C55] text-[#FE2C55]' : 'text-white'}`} />
                    <span className="text-xs text-white mt-1">{auction.like_count || 0}</span>
                </button>

                {/* Comment */}
                <button onClick={() => navigate(`/auction/${auction.id}`)} className="flex flex-col items-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                    <span className="text-xs text-white mt-1">Chat</span>
                </button>

                {/* Save */}
                <button onClick={() => { setSaved(!saved); onSave?.(auction.id); }} className="flex flex-col items-center">
                    <Bookmark className={`w-7 h-7 ${saved ? 'fill-[#25F4EE] text-[#25F4EE]' : 'text-white'}`} />
                    <span className="text-xs text-white mt-1">Save</span>
                </button>

                {/* Share */}
                <button className="flex flex-col items-center">
                    <Share2 className="w-7 h-7 text-white" />
                    <span className="text-xs text-white mt-1">Share</span>
                </button>
            </div>

            {/* Bottom Info + Bid */}
            <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                {/* Seller */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold">@{auction.creator?.tiktok_username || auction.creator?.name || 'seller'}</span>
                    {auction.creator?.tiktok_is_verified && (
                        <span className="w-4 h-4 bg-[#25F4EE] rounded-full flex items-center justify-center text-[8px]">✓</span>
                    )}
                    {auction.creator?.location && (
                        <span className="text-xs text-[#AAA]">· {auction.creator.location}</span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-2 line-clamp-2">{auction.title}</h3>

                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{auction.category}</span>
                    {auction.condition && (
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{auction.condition}</span>
                    )}
                </div>

                {/* Current Bid */}
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-xs text-[#AAA]">Current Bid</p>
                        <p className="text-2xl font-bold text-[#25F4EE]">{formatPrice(auction.current_bid || auction.starting_bid || 0)}</p>
                    </div>
                    {auction.retail_price && (
                        <div className="text-right">
                            <p className="text-xs text-[#AAA]">Retail</p>
                            <p className="text-sm text-[#AAA] line-through">{formatPrice(auction.retail_price)}</p>
                        </div>
                    )}
                </div>

                {/* Quick Bid */}
                {(auction.status === 'live' || auction.status === 'ending_soon') && (
                    <div className="flex gap-2">
                        {showBidInput && (
                            <input
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                className="flex-1 bg-white/10 border border-[#333] rounded-full px-4 py-2.5 text-white text-sm outline-none focus:border-[#FE2C55]"
                                placeholder={`Min ${formatPrice(minBid)}`}
                                step="0.01"
                            />
                        )}
                        <button
                            onClick={handleBid}
                            className="flex-1 bg-[#FE2C55] text-white font-bold py-2.5 rounded-full text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                            <Zap className="w-4 h-4" />
                            {showBidInput ? 'Place Bid' : `Bid ${formatPrice(minBid)}`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Home() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('for_you');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadAuctions();
    }, [activeTab]);

    const loadAuctions = async () => {
        try {
            setLoading(true);
            const params = { per_page: 20 };
            if (activeTab === 'live') params.status = 'live';
            if (activeTab === 'ending') params.status = 'ending_soon';
            const { data } = await api.get('/auctions', { params });
            setAuctions(data.data || data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBid = async (auctionId, amount) => {
        try {
            await api.post(`/auctions/${auctionId}/bid`, { amount });
            loadAuctions();
        } catch (err) {
            alert(err.response?.data?.message || 'Bid failed');
        }
    };

    const handleSave = async (auctionId) => {
        if (!user) { navigate('/login'); return; }
        try { await api.post(`/auctions/${auctionId}/save`); } catch (err) { console.error(err); }
    };

    const handleLike = async (auctionId) => {
        if (!user) { navigate('/login'); return; }
        try { await api.post(`/auctions/${auctionId}/like`); } catch (err) { console.error(err); }
    };

    const tabs = [
        { id: 'for_you', label: 'For You' },
        { id: 'live', label: 'Live' },
        { id: 'ending', label: 'Ending Soon' },
        { id: 'following', label: 'Following' },
    ];

    return (
        <div className="tiktok-container bg-black min-h-screen">
            {/* Top Nav */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-gradient-to-b from-black/90 to-transparent pt-2 pb-6 px-4">
                <div className="flex items-center justify-center gap-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-sm font-semibold pb-1 transition-all ${activeTab === tab.id ? 'text-white border-b-2 border-white' : 'text-white/50'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feed */}
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-8 h-8 border-2 border-[#FE2C55] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : auctions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-screen text-[#AAA]">
                    <Flame className="w-16 h-16 mb-4 text-[#FE2C55]" />
                    <p className="text-lg font-semibold">No auctions yet</p>
                    <p className="text-sm mt-1">Be the first to create one!</p>
                    <button onClick={() => navigate('/create')} className="mt-4 bg-[#FE2C55] px-6 py-2 rounded-full text-sm font-bold">
                        Create Auction
                    </button>
                </div>
            ) : (
                <div className="tiktok-feed hide-scrollbar pb-16">
                    {auctions.map(auction => (
                        <div key={auction.id} className="tiktok-feed-item">
                            <AuctionFeedCard
                                auction={auction}
                                onBid={handleBid}
                                onSave={handleSave}
                                onLike={handleLike}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Swipe Hint */}
            {auctions.length > 1 && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 swipe-hint">
                    <ChevronUp className="w-6 h-6 text-white/40" />
                </div>
            )}
        </div>
    );
}
