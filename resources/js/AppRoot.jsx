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
import { useTheme } from './hooks/useTheme';
import { Toaster } from './components/ui/Toaster';

export default function App() {
    const { theme } = useTheme();
    const location = useLocation();
    const isAuctionDetail = location.pathname.startsWith('/auction/');

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'theme-dark bg-[#0f0f0f] text-white' : 'theme-light bg-white text-[#0f0f0f]'}`}>
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
            {!isAuctionDetail && <BottomNav />}
            <Toaster />
        </div>
    );
}
