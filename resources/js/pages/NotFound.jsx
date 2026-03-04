import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="tiktok-container bg-black min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <p className="text-6xl font-bold tiktok-gradient mb-4">404</p>
            <p className="text-lg font-semibold mb-2">Page Not Found</p>
            <p className="text-sm text-[#AAA] mb-6">This auction doesn't exist yet</p>
            <button onClick={() => navigate('/')} className="bg-[#FE2C55] text-white font-bold px-8 py-3 rounded-full text-sm flex items-center gap-2">
                <Home className="w-4 h-4" /> Go Home
            </button>
        </div>
    );
}
