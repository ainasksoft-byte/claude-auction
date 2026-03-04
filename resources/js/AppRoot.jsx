import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/Toaster';

export default function App() {
    const location = useLocation();
    const isAuctionDetail = location.pathname.startsWith('/auction/');
    const isAdmin = location.pathname.startsWith('/admin');
    const isCreate = location.pathname === '/create';

    return (
        <div className="min-h-screen bg-black text-white">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auctions" element={<Auctions />} />
                <Route path="/auction/:id" element={<AuctionDetail />} />
                <Route path="/create" element={<CreateAuction />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/inbox" element={<Notifications />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {!isAuctionDetail && !isAdmin && !isCreate && <BottomNav />}
            <Toaster />
        </div>
    );
}
