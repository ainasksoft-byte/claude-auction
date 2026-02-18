import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import TikTokVideoPicker from '../components/TikTokVideoPicker';
import api from '../lib/api';
import { toast } from '../components/ui/Toaster';
import { validateTikTokUrl } from '../lib/utils';

const categories = [
    'Automotive', 'Watches', 'Electronics', 'Fashion', 'Photography',
    'Gaming', 'Luxury', 'Art', 'Collectibles', 'Sports', 'Home', 'Other'
];

export default function CreateAuction() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { isAuthenticated, user } = useAuth();
    const isDark = theme === 'dark';
    const [showVideoPicker, setShowVideoPicker] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        current_bid: '',
        reserve_price: '',
        start_time: '',
        end_time: '',
        tiktok_video_url: '',
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pb-20 px-4">
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sign in to Create</h2>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>You need to be logged in to create an auction.</p>
                <button onClick={() => navigate('/login')} className="px-6 py-3 bg-tiktok-red text-white font-bold rounded-xl">
                    Sign In
                </button>
            </div>
        );
    }

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Title is required';
        if (!form.description.trim()) errs.description = 'Description is required';
        if (!form.category) errs.category = 'Category is required';
        if (!form.current_bid || parseFloat(form.current_bid) <= 0) errs.current_bid = 'Starting bid must be greater than 0';
        if (!form.start_time) errs.start_time = 'Start time is required';
        if (!form.end_time) errs.end_time = 'End time is required';
        if (form.start_time && form.end_time && new Date(form.end_time) <= new Date(form.start_time)) {
            errs.end_time = 'End time must be after start time';
        }
        if (form.tiktok_video_url && !validateTikTokUrl(form.tiktok_video_url)) {
            errs.tiktok_video_url = 'Invalid TikTok URL format';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            let imageUrls = [];
            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach(file => formData.append('images[]', file));
                const { data: uploadData } = await api.post('/auctions/upload-images', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                imageUrls = uploadData.urls;
            }

            const { data } = await api.post('/auctions', {
                ...form,
                current_bid: parseFloat(form.current_bid),
                reserve_price: form.reserve_price ? parseFloat(form.reserve_price) : null,
                images: imageUrls,
            });

            toast('Auction created successfully!', 'success');
            navigate(`/auction/${data.id}`);
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to create auction';
            toast(msg, 'error');
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none transition ${
        isDark ? 'bg-[#262626] text-white placeholder-gray-500 focus:ring-2 focus:ring-tiktok-red' : 'bg-gray-100 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-tiktok-red'
    }`;

    const labelClass = `block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

    return (
        <div className="pb-24 px-4 pt-6">
            <div className="max-w-lg mx-auto">
                <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Auction</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className={labelClass}>Title</label>
                        <input type="text" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="What are you auctioning?" className={inputClass} />
                        {errors.title && <p className="text-tiktok-red text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Describe your item in detail..." rows={4} className={inputClass} />
                        {errors.description && <p className="text-tiktok-red text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className={labelClass}>Category</label>
                        <select value={form.category} onChange={e => handleChange('category', e.target.value)} className={inputClass}>
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-tiktok-red text-xs mt-1">{errors.category}</p>}
                    </div>

                    {/* Bid amounts */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Starting Bid ($)</label>
                            <input type="number" step="0.01" value={form.current_bid} onChange={e => handleChange('current_bid', e.target.value)} placeholder="0.00" className={inputClass} />
                            {errors.current_bid && <p className="text-tiktok-red text-xs mt-1">{errors.current_bid}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Reserve Price ($)</label>
                            <input type="number" step="0.01" value={form.reserve_price} onChange={e => handleChange('reserve_price', e.target.value)} placeholder="Optional" className={inputClass} />
                        </div>
                    </div>

                    {/* Times */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Start Time</label>
                            <input type="datetime-local" value={form.start_time} onChange={e => handleChange('start_time', e.target.value)} className={inputClass} />
                            {errors.start_time && <p className="text-tiktok-red text-xs mt-1">{errors.start_time}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>End Time</label>
                            <input type="datetime-local" value={form.end_time} onChange={e => handleChange('end_time', e.target.value)} className={inputClass} />
                            {errors.end_time && <p className="text-tiktok-red text-xs mt-1">{errors.end_time}</p>}
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className={labelClass}>Product Images</label>
                        <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                            isDark ? 'border-[#333] hover:border-tiktok-red/50' : 'border-gray-300 hover:border-tiktok-red/50'
                        }`}>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" id="image-upload" />
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                </svg>
                                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Click or drag images here</p>
                            </label>
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                                {imagePreviews.map((preview, i) => (
                                    <div key={i} className="relative flex-shrink-0">
                                        <img src={preview} alt="" className="w-20 h-20 rounded-lg object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-tiktok-red text-white rounded-full text-xs flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* TikTok Video */}
                    <div>
                        <label className={labelClass}>TikTok Video URL (Optional)</label>
                        <input type="url" value={form.tiktok_video_url} onChange={e => handleChange('tiktok_video_url', e.target.value)} placeholder="https://www.tiktok.com/@user/video/..." className={inputClass} />
                        {errors.tiktok_video_url && <p className="text-tiktok-red text-xs mt-1">{errors.tiktok_video_url}</p>}
                        {user?.tiktok_open_id && (
                            <button
                                type="button"
                                onClick={() => setShowVideoPicker(true)}
                                className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    isDark ? 'bg-[#262626] text-tiktok-cyan hover:bg-[#333]' : 'bg-gray-100 text-tiktok-cyan hover:bg-gray-200'
                                }`}
                            >
                                Select from My TikTok Videos
                            </button>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-tiktok-red text-white font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 transition text-lg"
                    >
                        {submitting ? 'Creating...' : 'Create Auction'}
                    </button>
                </form>
            </div>

            <TikTokVideoPicker
                isOpen={showVideoPicker}
                onClose={() => setShowVideoPicker(false)}
                onSelect={(url) => handleChange('tiktok_video_url', url)}
            />
        </div>
    );
}
