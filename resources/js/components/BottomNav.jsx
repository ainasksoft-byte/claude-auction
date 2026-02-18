import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated } = useAuth();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', icon: HomeIcon, label: 'Home' },
        { path: '/auctions', icon: SearchIcon, label: 'Explore' },
        { path: '/create', icon: PlusIcon, label: 'Create', special: true },
        { path: '/inbox', icon: BellIcon, label: 'Inbox' },
        { path: isAuthenticated ? '/me' : '/login', icon: UserIcon, label: 'Me' },
    ];

    return (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t ${
            theme === 'dark'
                ? 'bg-[#0f0f0f] border-[#262626]'
                : 'bg-white border-gray-200'
        }`}>
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
                {navItems.map(({ path, icon: Icon, label, special }) => (
                    <button
                        key={path}
                        onClick={() => navigate(path)}
                        className={`flex flex-col items-center justify-center gap-0.5 ${
                            special
                                ? 'relative -mt-5'
                                : ''
                        }`}
                    >
                        {special ? (
                            <div className="w-12 h-12 bg-tiktok-red rounded-lg flex items-center justify-center shadow-lg">
                                <Icon />
                            </div>
                        ) : (
                            <>
                                <div className={isActive(path) ? 'text-tiktok-red' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                    <Icon />
                                </div>
                                <span className={`text-[10px] ${isActive(path) ? 'text-tiktok-red' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {label}
                                </span>
                            </>
                        )}
                    </button>
                ))}
                <button onClick={toggleTheme} className={`flex flex-col items-center justify-center gap-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    <span className="text-[10px]">Theme</span>
                </button>
            </div>
        </nav>
    );
}
