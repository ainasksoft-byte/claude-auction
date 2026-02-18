import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../components/ui/Toaster';

export default function Register() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { register } = useAuth();
    const isDark = theme === 'dark';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !passwordConfirmation) {
            toast('Please fill in all fields', 'error');
            return;
        }
        if (password !== passwordConfirmation) {
            toast('Passwords do not match', 'error');
            return;
        }
        if (password.length < 8) {
            toast('Password must be at least 8 characters', 'error');
            return;
        }
        setLoading(true);
        try {
            await register(name, email, password, passwordConfirmation);
            toast('Account created successfully!', 'success');
            navigate('/');
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed';
            toast(message, 'error');
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
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className={inputClass} />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className={inputClass} />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={inputClass} />
                    <input type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" className={inputClass} />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-tiktok-red text-white font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 transition"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className={`text-center mt-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Already have an account?{' '}
                    <Link to="/login" className="text-tiktok-red font-semibold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
