import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { formatPrice, formatDate, getStatusColor, getStatusText } from '../lib/utils';
import api from '../lib/api';
import { toast } from '../components/ui/Toaster';

export default function Admin() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, isAuthenticated } = useAuth();
    const isDark = theme === 'dark';
    const [stats, setStats] = useState(null);
    const [auctions, setAuctions] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') return;

        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'dashboard') {
                    const { data } = await api.get('/admin/dashboard');
                    setStats(data);
                } else if (activeTab === 'auctions') {
                    const { data } = await api.get('/admin/auctions');
                    setAuctions(data.data || data);
                } else if (activeTab === 'users') {
                    const { data } = await api.get('/admin/users');
                    setUsers(data.data || data);
                }
            } catch (err) {
                toast('Failed to load admin data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [activeTab, isAuthenticated, user]);

    if (!isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pb-20">
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Access Required</h2>
                <button onClick={() => navigate('/')} className="text-tiktok-red hover:underline">Go Home</button>
            </div>
        );
    }

    const handleEndAuction = async (id) => {
        try {
            await api.post(`/admin/auctions/${id}/end`);
            toast('Auction ended', 'success');
            setAuctions(prev => prev.map(a => a.id === id ? { ...a, status: 'ended' } : a));
        } catch (err) {
            toast('Failed to end auction', 'error');
        }
    };

    const handleDeleteAuction = async (id) => {
        try {
            await api.delete(`/auctions/${id}`);
            toast('Auction deleted', 'success');
            setAuctions(prev => prev.filter(a => a.id !== id));
        } catch (err) {
            toast('Failed to delete auction', 'error');
        }
    };

    const handleUpdateRole = async (userId, role) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role });
            toast(`User role updated to ${role}`, 'success');
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
        } catch (err) {
            toast('Failed to update role', 'error');
        }
    };

    const tabs = [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'auctions', label: 'Auctions' },
        { key: 'users', label: 'Users' },
    ];

    return (
        <div className="pb-20 px-4 pt-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate('/me')} className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </button>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Panel</h1>
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 p-1 rounded-xl mb-6 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'}`}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                                activeTab === tab.key
                                    ? 'bg-tiktok-red text-white'
                                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin w-8 h-8 border-2 border-tiktok-red border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <>
                        {/* Dashboard */}
                        {activeTab === 'dashboard' && stats && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { label: 'Total Auctions', value: stats.total_auctions, color: 'text-tiktok-red' },
                                    { label: 'Active Auctions', value: stats.active_auctions, color: 'text-green-500' },
                                    { label: 'Total Bids', value: stats.total_bids, color: 'text-tiktok-cyan' },
                                    { label: 'Total Users', value: stats.total_users, color: 'text-tiktok-pink' },
                                    { label: 'Upcoming', value: stats.upcoming_auctions, color: 'text-blue-400' },
                                    { label: 'Ended', value: stats.ended_auctions, color: 'text-gray-400' },
                                ].map(item => (
                                    <div key={item.label} className={`p-4 rounded-xl text-center ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                                        <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Auctions Table */}
                        {activeTab === 'auctions' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                            <th className="text-left py-3 px-2">Title</th>
                                            <th className="text-left py-3 px-2">Creator</th>
                                            <th className="text-left py-3 px-2">Status</th>
                                            <th className="text-left py-3 px-2">Bid</th>
                                            <th className="text-left py-3 px-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auctions.map(auction => (
                                            <tr key={auction.id} className={`border-t ${isDark ? 'border-[#262626]' : 'border-gray-200'}`}>
                                                <td className="py-3 px-2 font-medium">{auction.title}</td>
                                                <td className={`py-3 px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{auction.creator?.name}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${getStatusColor(auction.status)}`}>
                                                        {getStatusText(auction.status)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-tiktok-red font-bold">{formatPrice(auction.current_bid)}</td>
                                                <td className="py-3 px-2">
                                                    <div className="flex gap-2">
                                                        <button onClick={() => navigate(`/auction/${auction.id}`)} className="text-tiktok-cyan text-xs hover:underline">View</button>
                                                        {auction.status !== 'ended' && (
                                                            <button onClick={() => handleEndAuction(auction.id)} className="text-yellow-500 text-xs hover:underline">End</button>
                                                        )}
                                                        <button onClick={() => handleDeleteAuction(auction.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Users Table */}
                        {activeTab === 'users' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                            <th className="text-left py-3 px-2">Name</th>
                                            <th className="text-left py-3 px-2">Email</th>
                                            <th className="text-left py-3 px-2">Role</th>
                                            <th className="text-left py-3 px-2">Joined</th>
                                            <th className="text-left py-3 px-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id} className={`border-t ${isDark ? 'border-[#262626]' : 'border-gray-200'}`}>
                                                <td className="py-3 px-2 font-medium">{u.name}</td>
                                                <td className={`py-3 px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-tiktok-red/20 text-tiktok-red' : isDark ? 'bg-[#262626] text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className={`py-3 px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(u.created_at)}</td>
                                                <td className="py-3 px-2">
                                                    {u.id !== user.id && (
                                                        <button
                                                            onClick={() => handleUpdateRole(u.id, u.role === 'admin' ? 'user' : 'admin')}
                                                            className="text-tiktok-cyan text-xs hover:underline"
                                                        >
                                                            {u.role === 'admin' ? 'Demote' : 'Promote'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
