import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Zap } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) { setError('Passwords do not match'); return; }
        setError('');
        setLoading(true);
        try {
            await register(name, email, password, passwordConfirm);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="tiktok-container bg-black min-h-screen flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <p className="text-sm text-[#AAA] mt-1">Join TikTok Auctions</p>
                </div>

                {error && <div className="bg-[#FE2C55]/10 border border-[#FE2C55]/30 rounded-xl px-4 py-3 mb-4 text-sm text-[#FE2C55]">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#25F4EE] text-sm" placeholder="Full Name" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#25F4EE] text-sm" placeholder="Email" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#25F4EE] text-sm" placeholder="Password" required minLength={8} />
                    <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#25F4EE] text-sm" placeholder="Confirm Password" required />
                    <button type="submit" disabled={loading} className="w-full bg-[#FE2C55] text-white font-bold py-3.5 rounded-full text-sm disabled:opacity-50 active:scale-95 transition-transform">
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-sm text-[#AAA] mt-6">
                    Already have an account? <Link to="/login" className="text-[#25F4EE] font-semibold">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
