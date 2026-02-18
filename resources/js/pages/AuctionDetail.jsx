import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useCountdown } from '../hooks/useCountdown';
import { useSocket } from '../hooks/useSocket';
import { formatPrice, formatDate, formatDateTime, getStatusColor, getStatusText } from '../lib/utils';
import AuctionCard from '../components/AuctionCard';
import TikTokEmbed from '../components/TikTokEmbed';
import api from '../lib/api';
import { toast } from '../components/ui/Toaster';

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const BookmarkIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
);

const BellIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
);

const TrendingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);

export default function AuctionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, isAuthenticated } = useAuth();
    const isDark = theme === 'dark';

    const [auction, setAuction] = useState(null);
    const [bids, setBids] = useState([]);
    const [similarAuctions, setSimilarAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [bidding, setBidding] = useState(false);
    const [saved, setSaved] = useState(false);
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const countdown = useCountdown(auction?.end_time);
    const { lastUpdate, refresh } = useSocket(id);

    const fetchAuction = useCallback(async () => {
        try {
            const { data } = await api.get(`/auctions/${id}`);
            setAuction(data);
            setBids(data.bids || []);
        } catch (err) {
            toast('Failed to load auction', 'error');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchAuction();
    }, [fetchAuction]);

    useEffect(() => {
        if (lastUpdate) {
            setAuction(lastUpdate);
            setBids(lastUpdate.bids || []);
        }
    }, [lastUpdate]);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const { data } = await api.get(`/auctions/${id}/similar`);
                setSimilarAuctions(data);
            } catch (err) {}
        };
        if (id) fetchSimilar();
    }, [id]);

    useEffect(() => {
        if (!isAuthenticated || !id) return;
        const checkSaved = async () => {
            try {
                const { data } = await api.get(`/auctions/${id}/is-saved`);
                setSaved(data.saved);
            } catch (err) {}
        };
        const checkReminder = async () => {
            try {
                const { data } = await api.get(`/auctions/${id}/reminder`);
                setReminderEnabled(data.enabled);
            } catch (err) {}
        };
        checkSaved();
        checkReminder();
    }, [isAuthenticated, id]);

    const handleBid = async () => {
        if (!isAuthenticated) { navigate('/login'); return; }
        if (!bidAmount || parseFloat(bidAmount) <= parseFloat(auction.current_bid)) {
            toast('Bid must be higher than current bid', 'error');
            return;
        }
        setBidding(true);
        try {
            const { data } = await api.post(`/auctions/${id}/bid`, { amount: parseFloat(bidAmount) });
            setAuction(data.auction);
            setBids(prev => [data.bid, ...prev]);
            setBidAmount('');
            toast('Bid placed successfully!', 'success');
            refresh();
        } catch (err) {
            toast(err.response?.data?.message || 'Failed to place bid', 'error');
        } finally {
            setBidding(false);
        }
    };

    const handleSave = async () => {
        if (!isAuthenticated) { navigate('/login'); return; }
        try {
            const { data } = await api.post(`/auctions/${id}/save`);
            setSaved(data.saved);
            toast(data.saved ? 'Auction saved' : 'Auction unsaved', 'success');
        } catch (err) {
            toast('Failed to save auction', 'error');
        }
    };

    const handleToggleReminder = async () => {
        if (!isAuthenticated) { navigate('/login'); return; }
        try {
            const { data } = await api.post(`/auctions/${id}/reminder`);
            setReminderEnabled(data.enabled);
            toast(data.enabled ? 'Reminder enabled' : 'Reminder disabled', 'success');
        } catch (err) {
            toast('Failed to toggle reminder', 'error');
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast('Link copied to clipboard!', 'success');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-3 border-tiktok-red border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!auction) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-xl font-bold mb-4">Auction not found</p>
                <button onClick={() => navigate('/auctions')} className="text-tiktok-red hover:underline">Browse Auctions</button>
            </div>
        );
    }

    const images = auction.images || [];

    return (
        <div className="pb-24">
            {/* Header */}
            <div className={`sticky top-0 z-40 px-4 py-3 flex items-center justify-between ${isDark ? 'bg-[#0f0f0f]/95 backdrop-blur' : 'bg-white/95 backdrop-blur'}`}>
                <button onClick={() => navigate(-1)} className={isDark ? 'text-white' : 'text-gray-900'}>
                    <ArrowLeftIcon />
                </button>
                <div className="flex items-center gap-1">
                    {(auction.status === 'live' || auction.status === 'ending_soon') && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> LIVE
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleSave} className={saved ? 'text-tiktok-red' : isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <BookmarkIcon filled={saved} />
                    </button>
                    <button onClick={handleToggleReminder} className={reminderEnabled ? 'text-tiktok-cyan' : isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <BellIcon filled={reminderEnabled} />
                    </button>
                    <button onClick={handleShare} className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <ShareIcon />
                    </button>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
                <div className="aspect-square overflow-hidden">
                    <img
                        src={images[selectedImage]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'}
                        alt={auction.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Countdown overlay */}
                {!countdown.isEnded && (
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
                        countdown.isUrgent ? 'bg-tiktok-red text-white countdown-urgent' : 'bg-black/60 text-white'
                    }`}>
                        {countdown.days > 0 && `${countdown.days}d `}{countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                    </div>
                )}
                {/* Status badge */}
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white ${getStatusColor(auction.status)}`}>
                    {getStatusText(auction.status)}
                </span>
                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                                    i === selectedImage ? 'border-tiktok-red' : 'border-white/30'
                                }`}
                            >
                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-4 py-6 max-w-4xl mx-auto">
                {/* Title & Creator */}
                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{auction.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isDark ? 'bg-[#262626] text-white' : 'bg-gray-200 text-gray-700'}`}>
                        {auction.creator?.name?.[0] || '?'}
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{auction.creator?.name || 'Unknown'}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-6">
                    <div>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Current Bid</p>
                        <p className="text-3xl font-bold text-tiktok-red">{formatPrice(auction.current_bid)}</p>
                    </div>
                    {auction.reserve_price && (
                        <div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Reserve Price</p>
                            <p className="text-xl font-bold text-green-500">{formatPrice(auction.reserve_price)}</p>
                        </div>
                    )}
                </div>

                {/* Stats Row */}
                <div className={`grid grid-cols-4 gap-3 p-4 rounded-xl mb-6 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                    <div className="text-center">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{auction.bids_count || bids.length}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Bids</p>
                    </div>
                    <div className="text-center">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{auction.anti_snipe_seconds}s</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Anti-Snipe</p>
                    </div>
                    <div className="text-center">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{auction.snipe_extensions}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Extensions</p>
                    </div>
                    <div className="text-center">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatDate(auction.start_time).split(',')[0]}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Started</p>
                    </div>
                </div>

                {/* Countdown Card */}
                {(auction.status === 'live' || auction.status === 'ending_soon') && !countdown.isEnded && (
                    <div className={`p-4 rounded-xl mb-6 ${countdown.isUrgent ? 'bg-tiktok-red/10 border border-tiktok-red/30' : isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                        <p className={`text-xs font-semibold mb-2 ${countdown.isUrgent ? 'text-tiktok-red' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {countdown.isUrgent ? 'ENDING SOON!' : 'TIME REMAINING'}
                        </p>
                        <div className="grid grid-cols-4 gap-2 text-center">
                            {[
                                { val: countdown.days, label: 'Days' },
                                { val: countdown.hours, label: 'Hours' },
                                { val: countdown.minutes, label: 'Minutes' },
                                { val: countdown.seconds, label: 'Seconds' },
                            ].map(({ val, label }) => (
                                <div key={label}>
                                    <p className={`text-2xl font-bold font-mono ${countdown.isUrgent ? 'text-tiktok-red' : isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {String(val).padStart(2, '0')}
                                    </p>
                                    <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="mb-6">
                    <h2 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Description</h2>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{auction.description}</p>
                </div>

                {/* TikTok Embed */}
                {auction.tiktok_video_url && (
                    <div className="mb-6">
                        <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Product Video</h2>
                        <TikTokEmbed url={auction.tiktok_video_url} />
                        <a
                            href={`https://ads.tiktok.com/i18n/creation`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                        >
                            Boost on TikTok
                        </a>
                    </div>
                )}

                {/* Bid History */}
                <div className="mb-6">
                    <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Bid History</h2>
                    {bids.length > 0 ? (
                        <div className="space-y-2">
                            {bids.map((bid, index) => (
                                <div
                                    key={bid.id}
                                    className={`flex items-center justify-between p-3 rounded-xl ${
                                        index === 0
                                            ? isDark ? 'bg-tiktok-red/10 border border-tiktok-red/20' : 'bg-red-50 border border-red-200'
                                            : isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isDark ? 'bg-[#262626] text-white' : 'bg-gray-200 text-gray-700'}`}>
                                            {bid.bidder?.name?.[0] || '?'}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{bid.bidder?.name || 'Anonymous'}</p>
                                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {formatDateTime(bid.created_at)}
                                                {bid.triggered_anti_snipe && <span className="ml-2 text-tiktok-red">Anti-Snipe</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className={`font-bold ${index === 0 ? 'text-tiktok-red' : isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {formatPrice(bid.amount)}
                                        </p>
                                        {index === 0 && <TrendingIcon />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No bids yet. Be the first!</p>
                    )}
                </div>

                {/* Similar Auctions */}
                {similarAuctions.length > 0 && (
                    <div>
                        <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Similar Auctions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {similarAuctions.map(a => (
                                <AuctionCard key={a.id} auction={a} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Bid Bar */}
            {(auction.status === 'live' || auction.status === 'ending_soon') && (
                <div className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-3 border-t ${
                    isDark ? 'bg-[#0f0f0f] border-[#262626]' : 'bg-white border-gray-200'
                }`}>
                    <div className="max-w-lg mx-auto flex gap-3">
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={e => setBidAmount(e.target.value)}
                            placeholder={`Min ${formatPrice(parseFloat(auction.current_bid) + 1)}`}
                            className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none ${
                                isDark ? 'bg-[#262626] text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'
                            }`}
                        />
                        <button
                            onClick={handleBid}
                            disabled={bidding}
                            className="px-8 py-3 bg-tiktok-red text-white font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 transition"
                        >
                            {bidding ? 'Placing...' : 'Place Bid'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
