import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Wallet, ShoppingBag, Gavel, Bookmark, TrendingUp, Clock, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Package, Truck, CheckCircle, AlertCircle, Star, ChevronRight } from 'lucide-react';
import api from '../lib/api';
import { formatPrice, formatDate, formatDateTime } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';

function StatCard({ icon: Icon, label, value, color = '#25F4EE' }) {
    return (
        <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
            <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4" style={{ color }} />
                <span className="text-xs text-[#AAA]">{label}</span>
            </div>
            <p className="text-lg font-bold">{value}</p>
        </div>
    );
}

function AuctionMiniCard({ auction, onClick }) {
    return (
        <div onClick={onClick} className="bg-[#111] rounded-xl border border-[#1F1F1F] p-3 flex gap-3 cursor-pointer active:scale-[0.98] transition-transform">
            <div className="w-16 h-16 rounded-lg bg-[#0a0a0a] overflow-hidden shrink-0">
                {auction.images?.[0] ? (
                    <img src={auction.images[0].url} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center"><Gavel className="w-6 h-6 text-[#333]" /></div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{auction.title}</p>
                <p className="text-xs text-[#AAA] mt-0.5">{auction.category}</p>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-bold text-[#25F4EE]">{formatPrice(auction.current_bid || 0)}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${auction.status === 'live' ? 'bg-green-500/20 text-green-400' : auction.status === 'ended' ? 'bg-[#333] text-[#AAA]' : 'bg-[#FE2C55]/20 text-[#FE2C55]'}`}>
                        {auction.status}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Profile() {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [wallet, setWallet] = useState(null);
    const [myAuctions, setMyAuctions] = useState([]);
    const [wonAuctions, setWonAuctions] = useState([]);
    const [savedAuctions, setSavedAuctions] = useState([]);
    const [myBids, setMyBids] = useState([]);
    const [orders, setOrders] = useState([]);
    const [payouts, setPayouts] = useState([]);
    const [payoutAmount, setPayoutAmount] = useState('');
    const [payoutMethod, setPayoutMethod] = useState('stripe');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) { navigate('/login'); return; }
        loadData();
    }, [isAuthenticated]);

    const loadData = async () => {
        try {
            setLoading(true);
            const results = await Promise.allSettled([
                api.get('/wallet'),
                api.get('/me/auctions'),
                api.get('/me/won'),
                api.get('/me/saved-auctions'),
                api.get('/me/bids'),
                api.get('/orders/buying'),
                api.get('/wallet/payouts'),
            ]);
            if (results[0].status === 'fulfilled') setWallet(results[0].value.data);
            if (results[1].status === 'fulfilled') setMyAuctions(results[1].value.data.data || results[1].value.data);
            if (results[2].status === 'fulfilled') setWonAuctions(results[2].value.data.data || results[2].value.data);
            if (results[3].status === 'fulfilled') setSavedAuctions(results[3].value.data.data || results[3].value.data);
            if (results[4].status === 'fulfilled') setMyBids(results[4].value.data.data || results[4].value.data);
            if (results[5].status === 'fulfilled') setOrders(results[5].value.data.data || results[5].value.data);
            if (results[6].status === 'fulfilled') setPayouts(results[6].value.data.data || results[6].value.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const requestPayout = async () => {
        if (!payoutAmount || parseFloat(payoutAmount) < 10) { alert('Minimum withdrawal is $10'); return; }
        try {
            await api.post('/wallet/payout', { amount: parseFloat(payoutAmount), payout_method: payoutMethod });
            setPayoutAmount('');
            loadData();
        } catch (err) { alert(err.response?.data?.message || 'Payout request failed'); }
    };

    const handleLogout = async () => { await logout(); navigate('/login'); };

    if (loading) return (
        <div className="tiktok-container bg-black min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FE2C55] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'selling', label: 'Selling' },
        { id: 'buying', label: 'Buying' },
        { id: 'wallet', label: 'Wallet' },
        { id: 'watchlist', label: 'Saved' },
    ];

    return (
        <div className="tiktok-container bg-black min-h-screen pb-20">
            {/* Profile Header */}
            <div className="px-4 pt-6 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] p-0.5">
                        <div className="w-full h-full rounded-full bg-[#111] overflow-hidden flex items-center justify-center">
                            {user?.tiktok_avatar_url || user?.avatar_url ? (
                                <img src={user.tiktok_avatar_url || user.avatar_url} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-8 h-8 text-[#AAA]" />
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold">{user?.name || 'User'}</h1>
                        {user?.tiktok_username && <p className="text-sm text-[#25F4EE]">@{user.tiktok_username}</p>}
                        <div className="flex items-center gap-3 mt-1">
                            {user?.is_seller && (
                                <span className="text-xs bg-[#FE2C55]/20 text-[#FE2C55] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3" /> Seller
                                </span>
                            )}
                            {user?.seller_verified && (
                                <span className="text-xs bg-[#25F4EE]/20 text-[#25F4EE] px-2 py-0.5 rounded-full">Verified</span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/settings')} className="w-9 h-9 rounded-full bg-[#111] border border-[#1F1F1F] flex items-center justify-center">
                            <Settings className="w-4 h-4 text-[#AAA]" />
                        </button>
                        <button onClick={handleLogout} className="w-9 h-9 rounded-full bg-[#111] border border-[#1F1F1F] flex items-center justify-center">
                            <LogOut className="w-4 h-4 text-[#FE2C55]" />
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="text-center">
                        <p className="text-lg font-bold">{myAuctions.length}</p>
                        <p className="text-[10px] text-[#AAA]">Auctions</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">{wonAuctions.length}</p>
                        <p className="text-[10px] text-[#AAA]">Won</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">{myBids.length}</p>
                        <p className="text-[10px] text-[#AAA]">Bids</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-[#25F4EE]">{formatPrice(wallet?.available_balance || 0)}</p>
                        <p className="text-[10px] text-[#AAA]">Balance</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1F1F1F] overflow-x-auto hide-scrollbar px-4">
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                        className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${activeTab === t.id ? 'text-white border-b-2 border-[#FE2C55]' : 'text-[#AAA]'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="px-4 py-4">
                {/* Overview */}
                {activeTab === 'overview' && (
                    <div className="space-y-4 fade-in">
                        <div className="grid grid-cols-2 gap-3">
                            <StatCard icon={Gavel} label="Active Auctions" value={myAuctions.filter(a => a.status === 'live').length} />
                            <StatCard icon={TrendingUp} label="Total Bids" value={myBids.length} color="#FE2C55" />
                            <StatCard icon={Package} label="Orders" value={orders.length} />
                            <StatCard icon={Wallet} label="Earnings" value={formatPrice(wallet?.available_balance || 0)} />
                        </div>

                        {myAuctions.filter(a => a.status === 'live').length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold mb-2">Active Auctions</h3>
                                <div className="space-y-2">
                                    {myAuctions.filter(a => a.status === 'live').slice(0, 3).map(a => (
                                        <AuctionMiniCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {wonAuctions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold mb-2">Recently Won</h3>
                                <div className="space-y-2">
                                    {wonAuctions.slice(0, 3).map(a => (
                                        <AuctionMiniCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Selling */}
                {activeTab === 'selling' && (
                    <div className="space-y-3 fade-in">
                        {myAuctions.length === 0 ? (
                            <div className="text-center py-12 text-[#AAA]">
                                <Gavel className="w-12 h-12 mx-auto mb-3 text-[#333]" />
                                <p className="text-sm mb-3">Start selling on TikTok Auctions</p>
                                <button onClick={() => navigate('/create')} className="bg-[#FE2C55] px-6 py-2 rounded-full text-sm font-bold text-white">
                                    Create Auction
                                </button>
                            </div>
                        ) : (
                            myAuctions.map(a => <AuctionMiniCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />)
                        )}
                    </div>
                )}

                {/* Buying */}
                {activeTab === 'buying' && (
                    <div className="space-y-4 fade-in">
                        <div>
                            <h3 className="text-sm font-bold mb-2">Bids Placed</h3>
                            {myBids.length === 0 ? (
                                <p className="text-sm text-[#AAA] py-4 text-center">No bids yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {myBids.map(a => <AuctionMiniCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-2">Won Auctions</h3>
                            {wonAuctions.length === 0 ? (
                                <p className="text-sm text-[#AAA] py-4 text-center">No wins yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {wonAuctions.map(a => <AuctionMiniCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-2">Orders</h3>
                            {orders.length === 0 ? (
                                <p className="text-sm text-[#AAA] py-4 text-center">No orders yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {orders.map(o => (
                                        <div key={o.id} className="bg-[#111] rounded-xl border border-[#1F1F1F] p-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold">{o.auction?.title || `Order #${o.id}`}</p>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${o.status === 'delivered' ? 'bg-green-500/20 text-green-400' : o.status === 'shipped' ? 'bg-[#25F4EE]/20 text-[#25F4EE]' : 'bg-[#FE2C55]/20 text-[#FE2C55]'}`}>
                                                    {o.status}
                                                </span>
                                            </div>
                                            <p className="text-sm font-bold text-[#25F4EE] mt-1">{formatPrice(o.amount)}</p>
                                            {o.tracking_number && <p className="text-xs text-[#AAA] mt-1">Tracking: {o.tracking_number}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Wallet */}
                {activeTab === 'wallet' && (
                    <div className="space-y-4 fade-in">
                        <div className="bg-gradient-to-br from-[#FE2C55]/20 to-[#25F4EE]/20 rounded-2xl p-5 border border-[#1F1F1F]">
                            <p className="text-xs text-[#AAA] uppercase">Available Balance</p>
                            <p className="text-3xl font-bold text-[#25F4EE] mt-1">{formatPrice(wallet?.available_balance || 0)}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                <p className="text-[10px] text-[#AAA]">Pending</p>
                                <p className="text-sm font-bold text-yellow-400">{formatPrice(wallet?.pending_balance || 0)}</p>
                            </div>
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                <p className="text-[10px] text-[#AAA]">Withdrawn</p>
                                <p className="text-sm font-bold text-green-400">{formatPrice(wallet?.withdrawn_amount || 0)}</p>
                            </div>
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                                <p className="text-[10px] text-[#AAA]">Fees Paid</p>
                                <p className="text-sm font-bold text-[#FE2C55]">{formatPrice(wallet?.platform_fees_paid || 0)}</p>
                            </div>
                        </div>

                        {/* Withdraw */}
                        <div className="bg-[#111] rounded-2xl p-4 border border-[#1F1F1F]">
                            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                                <ArrowUpRight className="w-4 h-4 text-[#25F4EE]" /> Withdraw Funds
                            </h3>
                            <input
                                type="number"
                                value={payoutAmount}
                                onChange={(e) => setPayoutAmount(e.target.value)}
                                className="w-full bg-black border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#25F4EE] text-sm mb-3"
                                placeholder="Amount (min $10)"
                                min="10"
                                step="0.01"
                            />
                            <div className="flex gap-2 mb-3">
                                {['stripe', 'paypal', 'bank_transfer'].map(m => (
                                    <button key={m} onClick={() => setPayoutMethod(m)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-medium ${payoutMethod === m ? 'bg-[#25F4EE] text-black' : 'bg-black border border-[#1F1F1F] text-[#AAA]'}`}>
                                        {m === 'bank_transfer' ? 'Bank' : m.charAt(0).toUpperCase() + m.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <button onClick={requestPayout} className="w-full bg-[#25F4EE] text-black font-bold py-3 rounded-full text-sm">
                                Request Payout
                            </button>
                        </div>

                        {/* Payout History */}
                        {payouts.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold mb-2">Payout History</h3>
                                <div className="space-y-2">
                                    {payouts.map(p => (
                                        <div key={p.id} className="bg-[#111] rounded-xl border border-[#1F1F1F] p-3 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold">{formatPrice(p.amount)}</p>
                                                <p className="text-xs text-[#AAA]">{p.payout_method} · {formatDate(p.created_at)}</p>
                                            </div>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === 'completed' ? 'bg-green-500/20 text-green-400' : p.status === 'rejected' ? 'bg-[#FE2C55]/20 text-[#FE2C55]' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Watchlist */}
                {activeTab === 'watchlist' && (
                    <div className="space-y-2 fade-in">
                        {savedAuctions.length === 0 ? (
                            <div className="text-center py-12 text-[#AAA]">
                                <Bookmark className="w-12 h-12 mx-auto mb-3 text-[#333]" />
                                <p className="text-sm">No saved auctions</p>
                            </div>
                        ) : (
                            savedAuctions.map(a => <AuctionMiniCard key={a.id} auction={a} onClick={() => navigate(`/auction/${a.id}`)} />)
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
