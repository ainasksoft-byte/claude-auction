import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Zap } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="tiktok-container bg-black min-h-screen flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold tiktok-gradient">TikTok Auctions</h1>
                    <p className="text-sm text-[#AAA] mt-1">Sign in to start bidding</p>
                </div>

                {error && <div className="bg-[#FE2C55]/10 border border-[#FE2C55]/30 rounded-xl px-4 py-3 mb-4 text-sm text-[#FE2C55]">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#FE2C55] text-sm"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#FE2C55] text-sm"
                        placeholder="Password"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FE2C55] text-white font-bold py-3.5 rounded-full text-sm disabled:opacity-50 active:scale-95 transition-transform"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1F1F1F]" /></div>
                    <div className="relative flex justify-center"><span className="bg-black px-4 text-xs text-[#AAA]">or continue with</span></div>
                </div>

                <button className="w-full bg-[#111] border border-[#1F1F1F] text-white font-medium py-3.5 rounded-full text-sm flex items-center justify-center gap-3 mb-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.26 8.26 0 004.76 1.52V6.69h-1z"/></svg>
                    Continue with TikTok
                </button>

                <p className="text-center text-sm text-[#AAA] mt-6">
                    Don't have an account? <Link to="/register" className="text-[#25F4EE] font-semibold">Sign Up</Link>
                </p>

                <div className="mt-6 bg-[#111] rounded-xl p-3 border border-[#1F1F1F]">
                    <p className="text-xs text-[#AAA] text-center">Demo: admin@example.com / password</p>
                </div>
            </div>
        </div>
    );
}
