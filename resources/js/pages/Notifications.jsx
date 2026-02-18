import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { formatDateTime } from '../lib/utils';
import api from '../lib/api';
import { toast } from '../components/ui/Toaster';

const typeIcons = {
    outbid: '💰',
    ending_soon: '⏰',
    auction_won: '🏆',
    auction_started: '🔔',
};

const typeColors = {
    outbid: 'text-yellow-500',
    ending_soon: 'text-tiktok-red',
    auction_won: 'text-green-500',
    auction_started: 'text-tiktok-cyan',
};

export default function Notifications() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();
    const isDark = theme === 'dark';
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) return;
        const fetchNotifications = async () => {
            try {
                const { data } = await api.get('/notifications');
                setNotifications(data.data || data);
            } catch (err) {
                console.error('Failed to fetch notifications:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [isAuthenticated]);

    const handleMarkRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (err) {
            toast('Failed to mark as read', 'error');
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await api.put('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            toast('All notifications marked as read', 'success');
        } catch (err) {
            toast('Failed to mark all as read', 'error');
        }
    };

    const handleClick = (notification) => {
        if (!notification.is_read) handleMarkRead(notification.id);
        if (notification.auction_id) navigate(`/auction/${notification.auction_id}`);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pb-20 px-4">
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sign in to view notifications</h2>
                <button onClick={() => navigate('/login')} className="px-6 py-3 bg-tiktok-red text-white font-bold rounded-xl">Sign In</button>
            </div>
        );
    }

    return (
        <div className="pb-20">
            <div className="px-4 pt-6 pb-4">
                <div className="max-w-lg mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Inbox</h1>
                        {notifications.some(n => !n.is_read) && (
                            <button onClick={handleMarkAllRead} className="text-tiktok-cyan text-sm font-semibold hover:underline">
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`h-20 rounded-xl animate-pulse ${isDark ? 'bg-[#262626]' : 'bg-gray-200'}`}></div>
                            ))}
                        </div>
                    ) : notifications.length > 0 ? (
                        <div className="space-y-2">
                            {notifications.map(notification => (
                                <button
                                    key={notification.id}
                                    onClick={() => handleClick(notification)}
                                    className={`w-full text-left p-4 rounded-xl transition ${
                                        !notification.is_read
                                            ? isDark ? 'bg-[#1a1a2e]' : 'bg-blue-50'
                                            : isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'
                                    } hover:opacity-80`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">{typeIcons[notification.type] || '🔔'}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{notification.title}</h3>
                                                {!notification.is_read && (
                                                    <span className="w-2 h-2 bg-tiktok-cyan rounded-full flex-shrink-0"></span>
                                                )}
                                            </div>
                                            <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{notification.content}</p>
                                            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{formatDateTime(notification.created_at)}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                            </svg>
                            <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No notifications yet</p>
                            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>You'll be notified about bids and auctions</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
