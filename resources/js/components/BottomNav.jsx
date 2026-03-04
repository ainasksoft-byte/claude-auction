import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Bell, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            api.get('/notifications/unread-count')
                .then(({ data }) => setUnreadCount(data.count || 0))
                .catch(() => {});
        }
    }, [isAuthenticated, location.pathname]);

    const isAdmin = location.pathname === '/admin';
    if (isAdmin) return null;

    const tabs = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/auctions', icon: Search, label: 'Explore' },
        { path: '/create', icon: Plus, label: '', isCreate: true },
        { path: '/inbox', icon: Bell, label: 'Inbox', badge: unreadCount },
        { path: '/me', icon: User, label: 'Me' },
    ];

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/95 backdrop-blur-sm border-t border-[#1F1F1F] z-50">
            <div className="flex items-center justify-around py-1.5">
                {tabs.map(tab => {
                    const isActive = location.pathname === tab.path;

                    if (tab.isCreate) {
                        return (
                            <button key={tab.path} onClick={() => navigate(isAuthenticated ? '/create' : '/login')}
                                className="relative -mt-4">
                                <div className="w-12 h-8 bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] rounded-lg flex items-center justify-center">
                                    <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                                </div>
                            </button>
                        );
                    }

                    return (
                        <button key={tab.path} onClick={() => navigate(tab.path)}
                            className="flex flex-col items-center gap-0.5 py-1.5 px-3 relative">
                            <tab.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#AAA]'}`}
                                strokeWidth={isActive ? 2.5 : 1.5} />
                            <span className={`text-[10px] ${isActive ? 'text-white font-semibold' : 'text-[#AAA]'}`}>{tab.label}</span>
                            {tab.badge > 0 && (
                                <div className="absolute -top-0.5 right-1 w-4 h-4 bg-[#FE2C55] rounded-full flex items-center justify-center">
                                    <span className="text-[9px] font-bold">{tab.badge > 9 ? '9+' : tab.badge}</span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            {/* Safe area padding for iOS */}
            <div className="h-safe-area-inset-bottom" />
        </div>
    );
}
