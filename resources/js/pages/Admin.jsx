import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Gavel, Users, DollarSign, Rocket, Shield, AlertTriangle, Settings, Activity, TrendingUp, Eye, Pause, Clock, Ban, CheckCircle, XCircle, ChevronRight, BarChart3, ArrowUpRight, ArrowDownRight, Zap, FileText, Search, RefreshCw } from 'lucide-react';
import api from '../lib/api';
import { formatPrice, formatDate, formatDateTime } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';

function HudCard({ title, value, subtitle, icon: Icon, color = '#25F4EE', glow }) {
    return (
        <div className={`hud-border rounded-xl p-4 ${glow ? (color === '#FE2C55' ? 'glow-pink' : 'glow-cyan') : ''}`}>
            <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" style={{ color }} />
                <span className="text-xs text-[#AAA]">{subtitle}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs text-[#AAA] mt-1">{title}</p>
        </div>
    );
}

function AdminTable({ headers, rows, onAction }) {
    return (
        <div className="overflow-x-auto admin-scroll">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[#1F1F1F]">
                        {headers.map(h => <th key={h} className="text-left py-3 px-3 text-xs text-[#AAA] font-medium">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="border-b border-[#1F1F1F]/50 hover:bg-[#111]">
                            {row.map((cell, j) => <td key={j} className="py-3 px-3">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function Admin() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [auctions, setAuctions] = useState([]);
    const [payments, setPayments] = useState(null);
    const [boostCampaigns, setBoostCampaigns] = useState([]);
    const [fraudReports, setFraudReports] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'admin') { navigate('/'); return; }
        loadSection(activeSection);
    }, [activeSection, user]);

    const loadSection = async (section) => {
        try {
            setLoading(true);
            switch (section) {
                case 'dashboard': {
                    const { data } = await api.get('/admin/dashboard');
                    setStats(data);
                    break;
                }
                case 'users': {
                    const { data } = await api.get('/admin/users', { params: { search: searchQuery } });
                    setUsers(data.data || data);
                    break;
                }
                case 'auctions': {
                    const { data } = await api.get('/admin/auctions', { params: { search: searchQuery } });
                    setAuctions(data.data || data);
                    break;
                }
                case 'payments': {
                    const { data } = await api.get('/admin/payments');
                    setPayments(data);
                    break;
                }
                case 'boosts': {
                    const { data } = await api.get('/admin/boost-campaigns');
                    setBoostCampaigns(data.data || data);
                    break;
                }
                case 'fraud': {
                    const { data } = await api.get('/admin/fraud-reports');
                    setFraudReports(data.data || data);
                    break;
                }
                case 'audit': {
                    const { data } = await api.get('/admin/audit-logs');
                    setAuditLogs(data.data || data);
                    break;
                }
                case 'settings': {
                    const { data } = await api.get('/admin/settings');
                    setSettings(data);
                    break;
                }
            }
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAuctionAction = async (id, action, extra = {}) => {
        try {
            if (action === 'end') await api.post(`/admin/auctions/${id}/end`);
            if (action === 'pause') await api.post(`/admin/auctions/${id}/pause`);
            if (action === 'extend') await api.post(`/admin/auctions/${id}/extend`, { minutes: 30 });
            loadSection('auctions');
        } catch (err) { alert(err.response?.data?.message || 'Action failed'); }
    };

    const handleUserAction = async (id, role) => {
        try {
            await api.put(`/admin/users/${id}/role`, { role });
            loadSection('users');
        } catch (err) { alert('Failed'); }
    };

    const handleSellerAction = async (id, status) => {
        try {
            await api.put(`/admin/sellers/${id}/status`, { seller_status: status });
            loadSection('users');
        } catch (err) { alert('Failed'); }
    };

    const handlePayoutAction = async (id, status) => {
        try {
            await api.put(`/admin/payouts/${id}`, { status });
            loadSection('payments');
        } catch (err) { alert('Failed'); }
    };

    const handleSaveSettings = async () => {
        try {
            await api.put('/admin/settings', settings);
            alert('Settings saved');
        } catch (err) { alert('Failed'); }
    };

    const sidebar = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'auctions', icon: Gavel, label: 'Auctions' },
        { id: 'users', icon: Users, label: 'Users & Sellers' },
        { id: 'payments', icon: DollarSign, label: 'Payments' },
        { id: 'boosts', icon: Rocket, label: 'Boost Campaigns' },
        { id: 'fraud', icon: AlertTriangle, label: 'Fraud Detection' },
        { id: 'audit', icon: FileText, label: 'Audit Logs' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <div className="w-56 bg-[#0a0a0a] border-r border-[#1F1F1F] flex flex-col shrink-0 fixed left-0 top-0 h-screen z-50">
                <div className="p-4 border-b border-[#1F1F1F]">
                    <h1 className="text-lg font-bold tiktok-gradient">Admin HUD</h1>
                    <p className="text-xs text-[#AAA] mt-0.5">Control Panel</p>
                </div>
                <nav className="flex-1 py-2 overflow-y-auto admin-scroll">
                    {sidebar.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${activeSection === item.id ? 'bg-[#FE2C55]/10 text-[#FE2C55] border-r-2 border-[#FE2C55]' : 'text-[#AAA] hover:text-white hover:bg-[#111]'}`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-[#1F1F1F]">
                    <p className="text-xs text-[#AAA]">Logged in as</p>
                    <p className="text-sm font-bold truncate">{user?.name}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-56 p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold capitalize">{activeSection === 'dashboard' ? 'Dashboard Overview' : activeSection}</h2>
                    <div className="flex items-center gap-3">
                        {(activeSection === 'users' || activeSection === 'auctions') && (
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA]" />
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && loadSection(activeSection)}
                                    className="bg-[#111] border border-[#1F1F1F] rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-[#FE2C55] w-64"
                                    placeholder="Search..."
                                />
                            </div>
                        )}
                        <button onClick={() => loadSection(activeSection)} className="w-9 h-9 rounded-lg bg-[#111] border border-[#1F1F1F] flex items-center justify-center">
                            <RefreshCw className="w-4 h-4 text-[#AAA]" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#25F4EE] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Dashboard */}
                        {activeSection === 'dashboard' && stats && (
                            <div className="space-y-6 fade-in">
                                <div className="grid grid-cols-4 gap-4">
                                    <HudCard icon={Activity} title="Active Auctions" value={stats.active_auctions} subtitle="live" color="#25F4EE" glow />
                                    <HudCard icon={Zap} title="Bids Today" value={stats.bids_today} subtitle="24h" color="#FE2C55" glow />
                                    <HudCard icon={DollarSign} title="Total Revenue" value={formatPrice(stats.total_revenue || 0)} subtitle="all time" color="#25F4EE" />
                                    <HudCard icon={DollarSign} title="Fees Collected" value={formatPrice(stats.total_fees || 0)} subtitle="platform" color="#FE2C55" />
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <HudCard icon={Users} title="Total Users" value={stats.total_users} subtitle="registered" />
                                    <HudCard icon={Users} title="Sellers" value={stats.total_sellers || 0} subtitle="active" />
                                    <HudCard icon={Gavel} title="Total Auctions" value={stats.total_auctions} subtitle="created" />
                                    <HudCard icon={AlertTriangle} title="Fraud Alerts" value={stats.fraud_alerts || 0} subtitle="pending" color={stats.fraud_alerts > 0 ? '#FE2C55' : '#25F4EE'} glow={stats.fraud_alerts > 0} />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    {/* Top Auctions */}
                                    <div className="hud-border rounded-xl p-4">
                                        <h3 className="text-sm font-bold mb-3 neon-cyan">Top Performing Auctions</h3>
                                        {(stats.top_auctions || []).map(a => (
                                            <div key={a.id} className="flex items-center justify-between py-2 border-b border-[#1F1F1F]/50">
                                                <div>
                                                    <p className="text-sm font-medium truncate max-w-[200px]">{a.title}</p>
                                                    <p className="text-xs text-[#AAA]">{a.bid_count} bids</p>
                                                </div>
                                                <p className="text-sm font-bold text-[#25F4EE]">{formatPrice(a.current_bid)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Top Sellers */}
                                    <div className="hud-border rounded-xl p-4">
                                        <h3 className="text-sm font-bold mb-3 neon-pink">Top Sellers</h3>
                                        {(stats.top_sellers || []).map(s => (
                                            <div key={s.id} className="flex items-center justify-between py-2 border-b border-[#1F1F1F]/50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-xs">{s.name?.[0]}</div>
                                                    <div>
                                                        <p className="text-sm font-medium">@{s.tiktok_username || s.name}</p>
                                                        <p className="text-xs text-[#AAA]">{s.total_auctions_completed} sales</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-400 text-sm">★</span>
                                                    <span className="text-sm">{s.seller_rating}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Financial Summary */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="hud-border rounded-xl p-4 text-center">
                                        <p className="text-xs text-[#AAA]">Escrow Held</p>
                                        <p className="text-xl font-bold text-yellow-400">{formatPrice(stats.escrow_held || 0)}</p>
                                    </div>
                                    <div className="hud-border rounded-xl p-4 text-center">
                                        <p className="text-xs text-[#AAA]">Pending Payouts</p>
                                        <p className="text-xl font-bold text-[#FE2C55]">{formatPrice(stats.pending_payouts || 0)}</p>
                                    </div>
                                    <div className="hud-border rounded-xl p-4 text-center">
                                        <p className="text-xs text-[#AAA]">Total Bids</p>
                                        <p className="text-xl font-bold text-[#25F4EE]">{stats.total_bids}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Auctions Management */}
                        {activeSection === 'auctions' && (
                            <div className="fade-in">
                                <div className="hud-border rounded-xl overflow-hidden">
                                    <AdminTable
                                        headers={['ID', 'Title', 'Seller', 'Current Bid', 'Bids', 'Status', 'Fraud', 'Actions']}
                                        rows={auctions.map(a => [
                                            <span className="text-xs text-[#AAA]">#{a.id}</span>,
                                            <span className="text-sm font-medium truncate max-w-[150px] block">{a.title}</span>,
                                            <span className="text-xs text-[#25F4EE]">@{a.creator?.tiktok_username || a.creator?.name}</span>,
                                            <span className="text-sm font-bold text-[#25F4EE]">{formatPrice(a.current_bid)}</span>,
                                            <span className="text-sm">{a.bids_count || 0}</span>,
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.status === 'live' ? 'bg-green-500/20 text-green-400' : a.status === 'ended' ? 'bg-[#333] text-[#AAA]' : 'bg-[#FE2C55]/20 text-[#FE2C55]'}`}>{a.status}</span>,
                                            <span className={`text-xs ${(a.fraud_score || 0) > 50 ? 'text-[#FE2C55]' : 'text-green-400'}`}>{a.fraud_score || 0}</span>,
                                            <div className="flex gap-1">
                                                {a.status === 'live' && (
                                                    <>
                                                        <button onClick={() => handleAuctionAction(a.id, 'pause')} className="p-1.5 rounded bg-yellow-500/20 text-yellow-400" title="Pause"><Pause className="w-3 h-3" /></button>
                                                        <button onClick={() => handleAuctionAction(a.id, 'end')} className="p-1.5 rounded bg-[#FE2C55]/20 text-[#FE2C55]" title="End"><XCircle className="w-3 h-3" /></button>
                                                        <button onClick={() => handleAuctionAction(a.id, 'extend')} className="p-1.5 rounded bg-[#25F4EE]/20 text-[#25F4EE]" title="+30min"><Clock className="w-3 h-3" /></button>
                                                    </>
                                                )}
                                            </div>,
                                        ])}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Users & Sellers */}
                        {activeSection === 'users' && (
                            <div className="fade-in">
                                <div className="hud-border rounded-xl overflow-hidden">
                                    <AdminTable
                                        headers={['User', 'Email', 'Role', 'Seller', 'Auctions', 'Bids', 'Actions']}
                                        rows={users.map(u => [
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-xs">{u.name?.[0]}</div>
                                                <div>
                                                    <p className="text-sm font-medium">{u.name}</p>
                                                    {u.tiktok_username && <p className="text-xs text-[#25F4EE]">@{u.tiktok_username}</p>}
                                                </div>
                                            </div>,
                                            <span className="text-xs text-[#AAA]">{u.email}</span>,
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-[#FE2C55]/20 text-[#FE2C55]' : 'bg-[#25F4EE]/20 text-[#25F4EE]'}`}>{u.role}</span>,
                                            <span className={`text-xs ${u.is_seller ? 'text-green-400' : 'text-[#AAA]'}`}>{u.is_seller ? (u.seller_verified ? 'Verified' : 'Active') : 'No'}</span>,
                                            <span className="text-sm">{u.auctions_count || 0}</span>,
                                            <span className="text-sm">{u.bids_count || 0}</span>,
                                            <div className="flex gap-1">
                                                {u.role !== 'admin' ? (
                                                    <button onClick={() => handleUserAction(u.id, 'admin')} className="text-xs bg-[#FE2C55]/20 text-[#FE2C55] px-2 py-1 rounded">Make Admin</button>
                                                ) : (
                                                    <button onClick={() => handleUserAction(u.id, 'user')} className="text-xs bg-[#111] text-[#AAA] px-2 py-1 rounded">Remove Admin</button>
                                                )}
                                                {u.is_seller && (
                                                    <>
                                                        <button onClick={() => handleSellerAction(u.id, 'active')} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Verify</button>
                                                        <button onClick={() => handleSellerAction(u.id, 'suspended')} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Suspend</button>
                                                        <button onClick={() => handleSellerAction(u.id, 'banned')} className="text-xs bg-[#FE2C55]/20 text-[#FE2C55] px-2 py-1 rounded">Ban</button>
                                                    </>
                                                )}
                                            </div>,
                                        ])}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Payments */}
                        {activeSection === 'payments' && payments && (
                            <div className="space-y-6 fade-in">
                                <div className="grid grid-cols-5 gap-4">
                                    <HudCard icon={DollarSign} title="Total Revenue" value={formatPrice(payments.summary?.total_revenue || 0)} subtitle="gross" color="#25F4EE" />
                                    <HudCard icon={DollarSign} title="Fees Collected" value={formatPrice(payments.summary?.total_fees || 0)} subtitle="platform" color="#FE2C55" />
                                    <HudCard icon={ArrowUpRight} title="Payouts" value={formatPrice(payments.summary?.total_payouts || 0)} subtitle="released" />
                                    <HudCard icon={Shield} title="Escrow Held" value={formatPrice(payments.summary?.escrow_held || 0)} subtitle="locked" color="yellow" />
                                    <HudCard icon={Clock} title="Pending Payouts" value={formatPrice(payments.summary?.pending_payouts || 0)} subtitle="awaiting" color="#FE2C55" />
                                </div>

                                <div className="hud-border rounded-xl overflow-hidden">
                                    <h3 className="text-sm font-bold p-4 border-b border-[#1F1F1F]">Transaction Ledger</h3>
                                    <AdminTable
                                        headers={['TX ID', 'Product', 'Buyer', 'Seller', 'Amount', 'Fee', 'Net', 'Status']}
                                        rows={(payments.entries?.data || []).map(e => [
                                            <span className="text-xs text-[#AAA] font-mono">{e.transaction_id?.slice(0, 8)}</span>,
                                            <span className="text-sm truncate max-w-[120px] block">{e.product_name}</span>,
                                            <span className="text-xs text-[#25F4EE]">{e.buyer?.name}</span>,
                                            <span className="text-xs text-[#FE2C55]">{e.seller?.name}</span>,
                                            <span className="text-sm font-bold">{formatPrice(e.winning_bid)}</span>,
                                            <span className="text-xs text-[#FE2C55]">-{formatPrice(e.platform_fee)}</span>,
                                            <span className="text-sm font-bold text-green-400">{formatPrice(e.net_payout)}</span>,
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${e.status === 'released' ? 'bg-green-500/20 text-green-400' : e.status === 'escrow' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-[#FE2C55]/20 text-[#FE2C55]'}`}>{e.status}</span>,
                                        ])}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Boost Campaigns */}
                        {activeSection === 'boosts' && (
                            <div className="fade-in hud-border rounded-xl overflow-hidden">
                                <AdminTable
                                    headers={['Auction', 'User', 'Type', 'Placement', 'Budget', 'Spent', 'Clicks', 'Conv.', 'Status', 'Actions']}
                                    rows={boostCampaigns.map(c => [
                                        <span className="text-sm truncate max-w-[100px] block">{c.auction?.title}</span>,
                                        <span className="text-xs text-[#25F4EE]">{c.user?.name}</span>,
                                        <span className="text-xs">{c.boost_type}</span>,
                                        <span className="text-xs">{c.placement}</span>,
                                        <span className="text-sm font-bold">{formatPrice(c.budget)}</span>,
                                        <span className="text-sm">{formatPrice(c.spent)}</span>,
                                        <span className="text-sm">{c.clicks}</span>,
                                        <span className="text-sm">{c.conversions}</span>,
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-[#333] text-[#AAA]'}`}>{c.status}</span>,
                                        <div className="flex gap-1">
                                            {c.status === 'active' && (
                                                <button onClick={async () => { await api.put(`/admin/boost-campaigns/${c.id}`, { status: 'paused' }); loadSection('boosts'); }}
                                                    className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Pause</button>
                                            )}
                                        </div>,
                                    ])}
                                />
                            </div>
                        )}

                        {/* Fraud */}
                        {activeSection === 'fraud' && (
                            <div className="fade-in hud-border rounded-xl overflow-hidden">
                                {fraudReports.length === 0 ? (
                                    <div className="p-12 text-center text-[#AAA]">
                                        <Shield className="w-12 h-12 mx-auto mb-3 text-green-400" />
                                        <p className="text-sm">No pending fraud reports</p>
                                    </div>
                                ) : (
                                    <AdminTable
                                        headers={['Type', 'Reported By', 'Reason', 'Status', 'Date', 'Actions']}
                                        rows={fraudReports.map(r => [
                                            <span className="text-xs">{r.reportable_type}</span>,
                                            <span className="text-xs text-[#25F4EE]">{r.reporter?.name}</span>,
                                            <span className="text-sm">{r.reason}</span>,
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{r.status}</span>,
                                            <span className="text-xs text-[#AAA]">{formatDate(r.created_at)}</span>,
                                            <div className="flex gap-1">
                                                <button onClick={async () => { await api.put(`/admin/fraud-reports/${r.id}`, { status: 'resolved' }); loadSection('fraud'); }}
                                                    className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Resolve</button>
                                                <button onClick={async () => { await api.put(`/admin/fraud-reports/${r.id}`, { status: 'dismissed' }); loadSection('fraud'); }}
                                                    className="text-xs bg-[#111] text-[#AAA] px-2 py-1 rounded">Dismiss</button>
                                            </div>,
                                        ])}
                                    />
                                )}
                            </div>
                        )}

                        {/* Audit Logs */}
                        {activeSection === 'audit' && (
                            <div className="fade-in hud-border rounded-xl overflow-hidden">
                                <AdminTable
                                    headers={['Admin', 'Action', 'Target', 'Details', 'IP', 'Date']}
                                    rows={auditLogs.map(l => [
                                        <span className="text-xs text-[#25F4EE]">{l.admin?.name}</span>,
                                        <span className="text-sm font-medium">{l.action}</span>,
                                        <span className="text-xs text-[#AAA]">{l.target_type} #{l.target_id}</span>,
                                        <span className="text-xs text-[#AAA] truncate max-w-[200px] block">{l.details}</span>,
                                        <span className="text-xs text-[#AAA] font-mono">{l.ip_address}</span>,
                                        <span className="text-xs text-[#AAA]">{formatDateTime(l.created_at)}</span>,
                                    ])}
                                />
                            </div>
                        )}

                        {/* Settings */}
                        {activeSection === 'settings' && (
                            <div className="fade-in max-w-lg">
                                <div className="hud-border rounded-xl p-6 space-y-4">
                                    <h3 className="text-sm font-bold neon-cyan">Platform Configuration</h3>
                                    {[
                                        { key: 'platform_fee_percent', label: 'Platform Fee (%)', type: 'number' },
                                        { key: 'min_withdrawal', label: 'Min Withdrawal ($)', type: 'number' },
                                        { key: 'anti_snipe_seconds', label: 'Anti-Snipe Seconds', type: 'number' },
                                        { key: 'max_auction_duration_days', label: 'Max Auction Duration (days)', type: 'number' },
                                    ].map(field => (
                                        <div key={field.key}>
                                            <label className="text-xs text-[#AAA] mb-1 block">{field.label}</label>
                                            <input
                                                type={field.type}
                                                value={settings[field.key] || ''}
                                                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                                                className="w-full bg-black border border-[#1F1F1F] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#25F4EE] text-sm"
                                            />
                                        </div>
                                    ))}
                                    <button onClick={handleSaveSettings}
                                        className="w-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] text-white font-bold py-3 rounded-lg text-sm">
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
