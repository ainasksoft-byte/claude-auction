import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function NotFound() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center pb-20 px-4">
            <h1 className="text-6xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">404</span>
            </h1>
            <p className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Page Not Found</p>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>The page you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="px-6 py-3 bg-tiktok-red text-white font-bold rounded-xl hover:bg-red-600 transition">
                Go Home
            </button>
        </div>
    );
}
