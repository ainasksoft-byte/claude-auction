import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Flame, Heart, Zap } from 'lucide-react';
import { formatPrice, formatTimeRemaining, getStatusColor, getStatusText } from '../lib/utils';
import { useCountdown } from '../hooks/useCountdown';

export default function AuctionCard({ auction, variant = 'card' }) {
    const navigate = useNavigate();
    const { timeRemaining, isUrgent } = useCountdown(auction.end_time);

    return (
        <div
            onClick={() => navigate(`/auction/${auction.id}`)}
            className="bg-[#111] rounded-2xl border border-[#1F1F1F] overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        >
            <div className="relative aspect-video bg-[#0a0a0a]">
                {auction.images?.[0] ? (
                    <img src={auction.images[0].url} alt={auction.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FE2C55]/10 to-[#25F4EE]/10">
                        <Flame className="w-8 h-8 text-[#FE2C55]/40" />
                    </div>
                )}
                <div className={`absolute top-2 left-2 ${getStatusColor(auction.status)} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase`}>
                    {getStatusText(auction.status)}
                </div>
                {(auction.status === 'live' || auction.status === 'ending_soon') && (
                    <div className={`absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded-full text-[10px] font-mono ${isUrgent ? 'text-[#FE2C55]' : 'text-white'}`}>
                        <Clock className="w-3 h-3 inline mr-0.5" />
                        {formatTimeRemaining(timeRemaining)}
                    </div>
                )}
            </div>
            <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-1">{auction.title}</h3>
                <div className="flex items-center justify-between mt-2">
                    <div>
                        <p className="text-xs text-[#AAA]">Current Bid</p>
                        <p className="text-lg font-bold text-[#25F4EE]">{formatPrice(auction.current_bid || auction.starting_bid || 0)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-[#AAA]">{auction.bid_count || 0} bids</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
