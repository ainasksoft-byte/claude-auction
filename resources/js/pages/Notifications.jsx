import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Gavel, Clock, Trophy, Users, CheckCheck, ArrowLeft } from 'lucide-react';
import api from '../lib/api';
import { formatDateTime } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';

const ICON_MAP = {
    outbid: Gavel,
    ending_soon: Clock,
    auction_won: Trophy,
    auction_started: Bell,
};

const COLOR_MAP = {
    outbid: '#FE2C55',
    ending_soon: '#25F4EE',
    auction_won: '#25F4EE',
    auction_started: '#FE2C55',
};

export default function Notifications() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        loadNotifications();
    }, [user]);

    const loadNotifications = async () => {
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data.data || data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const markRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (e) {}
    };

    const markAllRead = async () => {
        try {
            await api.put('/notifications/read-all');
            setNotifications(notifications.map(n => ({ ...n, is_read: true })));
        } catch (e) {}
    };

    return (
        <div className="tiktok-container bg-black min-h-screen pb-20">
            <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#1F1F1F] px-4 py-3 flex items-center justify-between">
                <h1 className="text-base font-bold">Inbox</h1>
                {notifications.some(n => !n.is_read) && (
                    <button onClick={markAllRead} className="text-xs text-[#25F4EE] font-semibold flex items-center gap-1">
                        <CheckCheck className="w-4 h-4" /> Mark all read
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#FE2C55] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#AAA]">
                    <Bell className="w-12 h-12 mb-3 text-[#333]" />
                    <p className="text-sm">No notifications yet</p>
                </div>
            ) : (
                <div>
                    {notifications.map(n => {
                        const Icon = ICON_MAP[n.type] || Bell;
                        const color = COLOR_MAP[n.type] || '#AAA';
                        return (
                            <button
                                key={n.id}
                                onClick={() => { markRead(n.id); if (n.auction_id) navigate(`/auction/${n.auction_id}`); }}
                                className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-[#1F1F1F] text-left transition-all ${!n.is_read ? 'bg-[#111]' : ''}`}
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                                    <Icon className="w-5 h-5" style={{ color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm ${!n.is_read ? 'font-bold' : 'font-medium text-[#CCC]'}`}>{n.title}</p>
                                    <p className="text-xs text-[#AAA] mt-0.5 line-clamp-2">{n.content}</p>
                                    <p className="text-xs text-[#555] mt-1">{formatDateTime(n.created_at)}</p>
                                </div>
                                {!n.is_read && <div className="w-2 h-2 rounded-full bg-[#FE2C55] mt-2 shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
