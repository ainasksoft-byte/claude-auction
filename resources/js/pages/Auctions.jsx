import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';
import AuctionCard from '../components/AuctionCard';
import api from '../lib/api';

const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);

const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
);

const statusFilters = ['all', 'live', 'upcoming', 'ending_soon', 'ended'];

export default function Auctions() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('card');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [categories, setCategories] = useState([]);

    const fetchAuctions = useCallback(async () => {
        setLoading(true);
        try {
            const params = {};
            if (statusFilter !== 'all') params.status = statusFilter;
            if (categoryFilter !== 'all') params.category = categoryFilter;
            if (search) params.search = search;

            const { data } = await api.get('/auctions', { params });
            setAuctions(data.data || data);
        } catch (err) {
            console.error('Failed to fetch auctions:', err);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, categoryFilter, search]);

    useEffect(() => {
        fetchAuctions();
    }, [fetchAuctions]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/auctions/categories');
                setCategories(data);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="pb-20">
            {/* Header */}
            <div className={`sticky top-0 z-40 px-4 pt-6 pb-3 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Explore</h1>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-tiktok-red text-white' : isDark ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                <GridIcon />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-tiktok-red text-white' : isDark ? 'text-gray-400' : 'text-gray-500'}`}
                            >
                                <ListIcon />
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-3">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search auctions..."
                            className={`w-full px-4 py-3 rounded-xl text-sm outline-none ${
                                isDark ? 'bg-[#262626] text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'
                            }`}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    {/* Status Filters */}
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3">
                        {statusFilters.map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                                    statusFilter === status
                                        ? 'bg-tiktok-red text-white'
                                        : isDark ? 'bg-[#262626] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {status === 'all' ? 'All' : status === 'ending_soon' ? 'Ending Soon' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Category Filters */}
                    {categories.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                            <button
                                onClick={() => setCategoryFilter('all')}
                                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                                    categoryFilter === 'all'
                                        ? 'bg-tiktok-cyan text-white'
                                        : isDark ? 'bg-[#262626] text-gray-400' : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                All Categories
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition ${
                                        categoryFilter === cat
                                            ? 'bg-tiktok-cyan text-white'
                                            : isDark ? 'bg-[#262626] text-gray-400' : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="px-4 py-4">
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className={`${viewMode === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}`}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={`rounded-2xl animate-pulse ${isDark ? 'bg-[#262626]' : 'bg-gray-200'} ${viewMode === 'card' ? 'aspect-[3/4]' : 'h-24'}`}></div>
                            ))}
                        </div>
                    ) : auctions.length > 0 ? (
                        <div className={viewMode === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
                            {auctions.map(auction => (
                                <AuctionCard key={auction.id} auction={auction} variant={viewMode} />
                            ))}
                        </div>
                    ) : (
                        <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                            </svg>
                            <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No auctions found</p>
                            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
