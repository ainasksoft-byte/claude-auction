import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useCountdown } from '../hooks/useCountdown';
import { formatPrice, getStatusColor, getStatusText, cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';
import { toast } from './ui/Toaster';

export default function AuctionCard({ auction, variant = 'card' }) {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();
    const countdown = useCountdown(auction.end_time);
    const [bidAmount, setBidAmount] = useState('');
    const [bidding, setBidding] = useState(false);
    const isDark = theme === 'dark';

    const mainImage = auction.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';

    const handleBid = async (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!bidAmount || parseFloat(bidAmount) <= auction.current_bid) {
            toast('Bid must be higher than current bid', 'error');
            return;
        }
        setBidding(true);
        try {
            await api.post(`/auctions/${auction.id}/bid`, { amount: parseFloat(bidAmount) });
            toast('Bid placed successfully!', 'success');
            setBidAmount('');
        } catch (err) {
            toast(err.response?.data?.message || 'Failed to place bid', 'error');
        } finally {
            setBidding(false);
        }
    };

    const countdownStr = countdown.isEnded
        ? 'Ended'
        : `${countdown.days > 0 ? countdown.days + 'd ' : ''}${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;

    if (variant === 'list') {
        return (
            <div
                onClick={() => navigate(`/auction/${auction.id}`)}
                className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.01] ${
                    isDark ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-gray-50 hover:bg-gray-100'
                }`}
            >
                <div className="relative w-24 h-24 flex-shrink-0">
                    <img src={mainImage} alt={auction.title} className="w-full h-full object-cover rounded-lg" />
                    <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white ${getStatusColor(auction.status)}`}>
                        {getStatusText(auction.status)}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{auction.title}</h3>
                    <p className="text-tiktok-red font-bold text-lg">{formatPrice(auction.current_bid)}</p>
                    {auction.reserve_price && (
                        <p className="text-green-500 text-xs">Reserve: {formatPrice(auction.reserve_price)}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{auction.bids_count || 0} bids</span>
                        <span className={`text-xs ${countdown.isUrgent ? 'text-tiktok-red countdown-urgent' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {countdownStr}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => navigate(`/auction/${auction.id}`)}
            className={`rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-lg ${
                isDark ? 'bg-[#1a1a1a]' : 'bg-white border border-gray-200'
            }`}
        >
            <div className="relative aspect-[3/4]">
                <img src={mainImage} alt={auction.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(auction.status)}`}>
                    {getStatusText(auction.status)}
                </span>
                {auction.tiktok_video_url && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white bg-black/60">
                        TikTok
                    </span>
                )}
                <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                    countdown.isUrgent ? 'bg-tiktok-red text-white countdown-urgent' : 'bg-black/60 text-white'
                }`}>
                    {countdownStr}
                </div>
            </div>
            <div className={`p-4 ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                <h3 className={`font-semibold text-sm line-clamp-2 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {auction.title}
                </h3>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-tiktok-red font-bold text-lg">{formatPrice(auction.current_bid)}</p>
                    {auction.reserve_price && (
                        <p className="text-green-500 text-xs font-medium">Reserve: {formatPrice(auction.reserve_price)}</p>
                    )}
                </div>
                <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {auction.bids_count || 0} bids
                    </span>
                </div>
                {auction.status !== 'ended' && auction.status !== 'upcoming' && (
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={e => setBidAmount(e.target.value)}
                            placeholder={`Min ${formatPrice(parseFloat(auction.current_bid) + 1)}`}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none ${
                                isDark ? 'bg-[#262626] text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'
                            }`}
                        />
                        <button
                            onClick={handleBid}
                            disabled={bidding}
                            className="px-4 py-2 bg-tiktok-red text-white text-sm font-bold rounded-lg hover:bg-red-600 disabled:opacity-50"
                        >
                            {bidding ? '...' : 'Bid'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
