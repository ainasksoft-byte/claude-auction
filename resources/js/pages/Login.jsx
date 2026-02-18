import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../components/ui/Toaster';

export default function Login() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { login } = useAuth();
    const isDark = theme === 'dark';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast('Please fill in all fields', 'error');
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            toast('Welcome back!', 'success');
            navigate('/');
        } catch (err) {
            toast(err.response?.data?.message || 'Invalid credentials', 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-tiktok-red ${
        isDark ? 'bg-[#262626] text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'
    }`;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pb-20">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold mb-2">
                        <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Auction IO</span>
                    </h1>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            className={inputClass}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-tiktok-red text-white font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 transition"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className={`text-center mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-tiktok-red font-semibold hover:underline">Register</Link>
                </p>

                <div className={`mt-4 p-3 rounded-xl text-xs text-center ${isDark ? 'bg-[#1a1a1a] text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                    Demo: admin@auctioneer.io / password
                </div>
            </div>
        </div>
    );
}
