import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Bookmark, Clock, Zap, Shield, MessageCircle, Star, Send, Eye, TrendingUp, AlertTriangle } from 'lucide-react';
import api from '../lib/api';
import { formatPrice, formatDateTime, formatTimeRemaining } from '../lib/utils';
import { useCountdown } from '../hooks/useCountdown';
import { useAuth } from '../hooks/useAuth';
import TikTokEmbed from '../components/TikTokEmbed';

function BidHistoryItem({ bid, isWinning }) {
    return (
        <div className={`flex items-center justify-between py-3 px-4 ${isWinning ? 'bg-[#25F4EE]/10 border-l-2 border-[#25F4EE]' : 'border-b border-[#1F1F1F]'}`}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-xs font-bold">
                    {bid.bidder?.name?.[0] || '?'}
                </div>
                <div>
                    <p className="text-sm font-semibold">{bid.bidder?.name || 'Anonymous'}</p>
                    <p className="text-xs text-[#AAA]">{formatDateTime(bid.created_at)}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-bold ${isWinning ? 'text-[#25F4EE]' : 'text-white'}`}>{formatPrice(bid.amount)}</p>
                {bid.triggered_anti_snipe && <p className="text-[10px] text-[#FE2C55]">Anti-snipe</p>}
            </div>
        </div>
    );
}

export default function AuctionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [auction, setAuction] = useState(null);
    const [bids, setBids] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [autoBidMax, setAutoBidMax] = useState('');
    const [showAutoBid, setShowAutoBid] = useState(false);
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [bidding, setBidding] = useState(false);
    const [tab, setTab] = useState('details');

    const { timeRemaining, isUrgent } = useCountdown(auction?.end_time);

    useEffect(() => { loadAuction(); }, [id]);

    const loadAuction = async () => {
        try {
            setLoading(true);
            const [auctionRes, bidsRes] = await Promise.all([
                api.get(`/auctions/${id}`),
                api.get(`/auctions/${id}/bids`),
            ]);
            setAuction(auctionRes.data);
            setBids(bidsRes.data.data || bidsRes.data);
            const minBid = parseFloat(auctionRes.data.current_bid || auctionRes.data.starting_bid || 1) + parseFloat(auctionRes.data.bid_increment || 1);
            setBidAmount(minBid.toFixed(2));

            if (user) {
                try {
                    const [savedRes, likedRes, commentsRes] = await Promise.all([
                        api.get(`/auctions/${id}/is-saved`),
                        api.get(`/auctions/${id}/is-liked`),
                        api.get(`/auctions/${id}/comments`),
                    ]);
                    setSaved(savedRes.data.saved);
                    setLiked(likedRes.data.liked);
                    setComments(commentsRes.data.data || commentsRes.data);
                } catch (e) {}
            } else {
                try {
                    const commentsRes = await api.get(`/auctions/${id}/comments`);
                    setComments(commentsRes.data.data || commentsRes.data);
                } catch (e) {}
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleBid = async () => {
        if (!user) { navigate('/login'); return; }
        try {
            setBidding(true);
            await api.post(`/auctions/${id}/bid`, { amount: parseFloat(bidAmount) });
            loadAuction();
        } catch (err) {
            alert(err.response?.data?.message || 'Bid failed');
        } finally { setBidding(false); }
    };

    const handleAutoBid = async () => {
        if (!user) { navigate('/login'); return; }
        try {
            await api.post(`/auctions/${id}/auto-bid`, { max_amount: parseFloat(autoBidMax) });
            setShowAutoBid(false);
        } catch (err) { alert(err.response?.data?.message || 'Failed'); }
    };

    const handleSave = async () => {
        if (!user) { navigate('/login'); return; }
        try { await api.post(`/auctions/${id}/save`); setSaved(!saved); } catch (e) {}
    };

    const handleLike = async () => {
        if (!user) { navigate('/login'); return; }
        try { const { data } = await api.post(`/auctions/${id}/like`); setLiked(data.liked); } catch (e) {}
    };

    const handleComment = async () => {
        if (!commentText.trim()) return;
        try {
            const { data } = await api.post(`/auctions/${id}/comment`, { content: commentText });
            setComments([data, ...comments]);
            setCommentText('');
        } catch (e) {}
    };

    if (loading) return (
        <div className="tiktok-container bg-black min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FE2C55] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!auction) return (
        <div className="tiktok-container bg-black min-h-screen flex items-center justify-center text-[#AAA]">
            Auction not found
        </div>
    );

    const minBid = parseFloat(auction.current_bid || auction.starting_bid || 1) + parseFloat(auction.bid_increment || 1);
    const isLive = auction.status === 'live' || auction.status === 'ending_soon';

    return (
        <div className="tiktok-container bg-black min-h-screen pb-32">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-black/90 backdrop-blur-sm flex items-center justify-between px-4 py-3">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3">
                    <button onClick={handleLike}>
                        <Heart className={`w-6 h-6 ${liked ? 'fill-[#FE2C55] text-[#FE2C55]' : ''}`} />
                    </button>
                    <button onClick={handleSave}>
                        <Bookmark className={`w-6 h-6 ${saved ? 'fill-[#25F4EE] text-[#25F4EE]' : ''}`} />
                    </button>
                    <button><Share2 className="w-6 h-6" /></button>
                </div>
            </div>

            <div className="pt-14">
                {/* Video Section */}
                <div className="relative aspect-[9/16] max-h-[60vh] bg-[#111]">
                    {auction.tiktok_video_url ? (
                        <TikTokEmbed url={auction.tiktok_video_url} />
                    ) : auction.images?.[0] ? (
                        <img src={auction.images[0].url} alt={auction.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#FE2C55]/20 to-[#25F4EE]/20 flex items-center justify-center">
                            <Eye className="w-20 h-20 text-white/20" />
                        </div>
                    )}
                    <div className={`absolute top-4 left-4 ${auction.status === 'live' ? 'bg-green-500' : auction.status === 'ending_soon' ? 'bg-[#FE2C55]' : 'bg-[#25F4EE]'} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                        {auction.status === 'live' && <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block mr-1" />}
                        {auction.status?.replace('_', ' ')}
                    </div>
                </div>

                {/* Timer Bar */}
                {isLive && (
                    <div className={`flex items-center justify-center gap-2 py-3 px-4 ${isUrgent ? 'bg-[#FE2C55]/20' : 'bg-[#111]'}`}>
                        <Clock className={`w-4 h-4 ${isUrgent ? 'text-[#FE2C55]' : 'text-[#25F4EE]'}`} />
                        <span className={`text-lg font-mono font-bold ${isUrgent ? 'text-[#FE2C55] countdown-urgent' : 'text-[#25F4EE]'}`}>
                            {formatTimeRemaining(timeRemaining)}
                        </span>
                        {isUrgent && <AlertTriangle className="w-4 h-4 text-[#FE2C55]" />}
                    </div>
                )}

                {/* Current Bid Banner */}
                <div className="bg-[#111] border-y border-[#1F1F1F] px-4 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-[#AAA] uppercase">Current Bid</p>
                        <p className="text-3xl font-bold text-[#25F4EE]">{formatPrice(auction.current_bid || auction.starting_bid || 0)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-[#AAA]">{auction.bid_count || 0} bids</p>
                        <p className="text-xs text-[#AAA]">{auction.view_count || 0} views</p>
                    </div>
                </div>

                {/* Seller Info */}
                <div className="px-4 py-3 flex items-center gap-3 border-b border-[#1F1F1F]">
                    <div className="w-10 h-10 rounded-full bg-[#222] border border-[#FE2C55] overflow-hidden flex items-center justify-center">
                        {auction.creator?.tiktok_avatar_url ? (
                            <img src={auction.creator.tiktok_avatar_url} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-sm font-bold">{auction.creator?.name?.[0]}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold">@{auction.creator?.tiktok_username || auction.creator?.name}</span>
                            {auction.creator?.tiktok_is_verified && <span className="w-4 h-4 bg-[#25F4EE] rounded-full text-[8px] flex items-center justify-center">✓</span>}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#AAA]">
                            {auction.creator?.seller_rating > 0 && (
                                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{auction.creator.seller_rating}</span>
                            )}
                            <span>{auction.creator?.total_auctions_completed || 0} sales</span>
                        </div>
                    </div>
                    <button className="border border-[#FE2C55] text-[#FE2C55] px-4 py-1.5 rounded-full text-xs font-bold">Follow</button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#1F1F1F]">
                    {['details', 'bids', 'comments'].map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`flex-1 py-3 text-sm font-semibold capitalize ${tab === t ? 'text-white border-b-2 border-[#FE2C55]' : 'text-[#AAA]'}`}>
                            {t} {t === 'bids' && `(${bids.length})`} {t === 'comments' && `(${comments.length})`}
                        </button>
                    ))}
                </div>

                {tab === 'details' && (
                    <div className="px-4 py-4 space-y-4">
                        <h1 className="text-xl font-bold">{auction.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-[#1F1F1F] px-3 py-1 rounded-full text-xs">{auction.category}</span>
                            {auction.condition && <span className="bg-[#1F1F1F] px-3 py-1 rounded-full text-xs">{auction.condition}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {auction.retail_price && (
                                <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                    <p className="text-xs text-[#AAA]">Retail Price</p>
                                    <p className="text-lg font-bold line-through text-[#AAA]">{formatPrice(auction.retail_price)}</p>
                                </div>
                            )}
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                <p className="text-xs text-[#AAA]">Starting Bid</p>
                                <p className="text-lg font-bold">{formatPrice(auction.starting_bid || 0)}</p>
                            </div>
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                <p className="text-xs text-[#AAA]">Bid Increment</p>
                                <p className="text-lg font-bold">{formatPrice(auction.bid_increment || 1)}</p>
                            </div>
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                <p className="text-xs text-[#AAA]">Ends</p>
                                <p className="text-sm font-bold">{formatDateTime(auction.end_time)}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-2">Description</h3>
                            <p className="text-sm text-[#AAA] leading-relaxed">{auction.description}</p>
                        </div>
                        <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F] flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[#25F4EE]" />
                            <div>
                                <p className="text-xs font-bold">Anti-Snipe Protection</p>
                                <p className="text-xs text-[#AAA]">Timer extends {auction.anti_snipe_seconds || 10}s on last-second bids</p>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'bids' && (
                    <div>
                        {bids.length === 0 ? (
                            <div className="py-12 text-center text-[#AAA]">
                                <TrendingUp className="w-10 h-10 mx-auto mb-2 text-[#333]" />
                                <p className="text-sm">No bids yet. Be the first!</p>
                            </div>
                        ) : (
                            bids.map((bid, i) => <BidHistoryItem key={bid.id} bid={bid} isWinning={i === 0} />)
                        )}
                    </div>
                )}

                {tab === 'comments' && (
                    <div className="px-4 py-4">
                        {user && (
                            <div className="flex gap-2 mb-4">
                                <input
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 bg-[#111] border border-[#1F1F1F] rounded-full px-4 py-2 text-sm outline-none focus:border-[#FE2C55]"
                                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                                />
                                <button onClick={handleComment} className="w-10 h-10 bg-[#FE2C55] rounded-full flex items-center justify-center">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        {comments.length === 0 ? (
                            <p className="text-center text-[#AAA] text-sm py-8">No comments yet</p>
                        ) : (
                            <div className="space-y-3">
                                {comments.map(c => (
                                    <div key={c.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-xs shrink-0">
                                            {c.user?.name?.[0] || '?'}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold">{c.user?.name || 'User'} <span className="text-[#AAA] font-normal">{formatDateTime(c.created_at)}</span></p>
                                            <p className="text-sm text-[#CCC] mt-0.5">{c.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Fixed Bottom Bid Bar */}
            {isLive && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/95 backdrop-blur-sm border-t border-[#1F1F1F] px-4 py-3 z-50 slide-up">
                    <div className="flex gap-2 mb-2">
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="flex-1 bg-[#111] border border-[#1F1F1F] rounded-full px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-sm"
                            placeholder={`Min ${formatPrice(minBid)}`}
                            step="0.01"
                            min={minBid}
                        />
                        <button
                            onClick={handleBid}
                            disabled={bidding}
                            className="bg-[#FE2C55] text-white font-bold px-6 py-3 rounded-full text-sm flex items-center gap-2 active:scale-95 transition-transform disabled:opacity-50"
                        >
                            <Zap className="w-4 h-4" />
                            {bidding ? '...' : 'Bid'}
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <button onClick={() => setShowAutoBid(!showAutoBid)} className="text-xs text-[#25F4EE] font-semibold">
                            Auto-Bid {showAutoBid ? '▲' : '▼'}
                        </button>
                        <p className="text-xs text-[#AAA]">Min: {formatPrice(minBid)}</p>
                    </div>
                    {showAutoBid && (
                        <div className="mt-2 flex gap-2">
                            <input
                                type="number"
                                value={autoBidMax}
                                onChange={(e) => setAutoBidMax(e.target.value)}
                                className="flex-1 bg-[#111] border border-[#1F1F1F] rounded-full px-4 py-2 text-white text-sm outline-none"
                                placeholder="Max auto-bid amount"
                                step="0.01"
                            />
                            <button onClick={handleAutoBid} className="bg-[#25F4EE] text-black font-bold px-4 py-2 rounded-full text-sm">Set</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
