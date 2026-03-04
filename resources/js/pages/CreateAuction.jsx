import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Video, DollarSign, Clock, Tag, FileText, Rocket, Plus, X, Image } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import TikTokVideoPicker from '../components/TikTokVideoPicker';

const CATEGORIES = ['Electronics', 'Fashion', 'Sneakers', 'Luxury', 'Gaming', 'Collectibles', 'Home', 'Mystery Boxes'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Used'];
const DURATIONS = [
    { label: '1 Hour', hours: 1 },
    { label: '6 Hours', hours: 6 },
    { label: '12 Hours', hours: 12 },
    { label: '1 Day', hours: 24 },
    { label: '3 Days', hours: 72 },
    { label: '7 Days', hours: 168 },
];

export default function CreateAuction() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [showVideoPicker, setShowVideoPicker] = useState(false);
    const [images, setImages] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        condition: 'New',
        retail_price: '',
        starting_bid: '1.00',
        bid_increment: '1.00',
        duration_hours: 24,
        tiktok_video_url: '',
        reserve_price: '',
    });

    if (!user) {
        navigate('/login');
        return null;
    }

    const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const formData = new FormData();
        files.forEach(f => formData.append('images[]', f));
        try {
            const { data } = await api.post('/auctions/upload-images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImages(prev => [...prev, ...(data.urls || data)]);
        } catch (err) { alert('Upload failed'); }
    };

    const handleSubmit = async () => {
        try {
            setSubmitting(true);
            const startTime = new Date();
            const endTime = new Date(startTime.getTime() + form.duration_hours * 60 * 60 * 1000);

            const { data } = await api.post('/auctions', {
                title: form.title,
                description: form.description,
                category: form.category,
                condition: form.condition,
                retail_price: form.retail_price || null,
                starting_bid: parseFloat(form.starting_bid),
                bid_increment: parseFloat(form.bid_increment),
                current_bid: 0,
                reserve_price: form.reserve_price || null,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString(),
                status: 'live',
                tiktok_video_url: form.tiktok_video_url || null,
                image_urls: images,
            });
            navigate(`/auction/${data.id}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create auction');
        } finally { setSubmitting(false); }
    };

    const canNext = () => {
        if (step === 1) return form.title && form.category;
        if (step === 2) return form.starting_bid;
        return true;
    };

    return (
        <div className="tiktok-container bg-black min-h-screen pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#1F1F1F] px-4 py-3 flex items-center justify-between">
                <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-1">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-base font-bold">Create Auction</h1>
                <div className="text-xs text-[#AAA]">Step {step}/3</div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-[#1F1F1F]">
                <div className="h-full bg-gradient-to-r from-[#25F4EE] to-[#FE2C55] transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            {/* Step 1: Product Details */}
            {step === 1 && (
                <div className="px-4 py-6 space-y-5 fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold">What are you selling?</h2>
                        <p className="text-sm text-[#AAA] mt-1">Add details about your product</p>
                    </div>

                    {/* TikTok Video */}
                    <div>
                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                            <Video className="w-4 h-4 text-[#FE2C55]" /> TikTok Product Video
                        </label>
                        {form.tiktok_video_url ? (
                            <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F] flex items-center justify-between">
                                <span className="text-sm text-[#25F4EE] truncate flex-1">{form.tiktok_video_url}</span>
                                <button onClick={() => updateForm('tiktok_video_url', '')} className="text-[#FE2C55] ml-2"><X className="w-4 h-4" /></button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowVideoPicker(true)}
                                className="w-full bg-[#111] border border-dashed border-[#333] rounded-xl p-6 flex flex-col items-center gap-2 text-[#AAA]"
                            >
                                <Video className="w-8 h-8 text-[#FE2C55]" />
                                <span className="text-sm">Select TikTok Video</span>
                                <span className="text-xs">Record a product video on TikTok first</span>
                            </button>
                        )}
                    </div>

                    {/* Images */}
                    <div>
                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                            <Image className="w-4 h-4 text-[#25F4EE]" /> Product Images
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {images.map((img, i) => (
                                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#1F1F1F]">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button onClick={() => setImages(images.filter((_, j) => j !== i))}
                                        className="absolute top-1 right-1 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <label className="w-20 h-20 rounded-lg border border-dashed border-[#333] flex items-center justify-center cursor-pointer bg-[#111]">
                                <Plus className="w-6 h-6 text-[#AAA]" />
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Product Title</label>
                        <input
                            value={form.title}
                            onChange={(e) => updateForm('title', e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-sm"
                            placeholder="e.g. iPhone 15 Pro Max 256GB"
                            maxLength={100}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                            <Tag className="w-4 h-4 text-[#25F4EE]" /> Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => updateForm('category', cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${form.category === cat ? 'bg-[#FE2C55] text-white' : 'bg-[#111] border border-[#1F1F1F] text-[#AAA]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="text-sm font-semibold mb-2 block">Condition</label>
                        <div className="flex flex-wrap gap-2">
                            {CONDITIONS.map(cond => (
                                <button
                                    key={cond}
                                    onClick={() => updateForm('condition', cond)}
                                    className={`px-4 py-2 rounded-full text-sm ${form.condition === cond ? 'bg-[#25F4EE] text-black font-bold' : 'bg-[#111] border border-[#1F1F1F] text-[#AAA]'}`}
                                >
                                    {cond}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => updateForm('description', e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-sm min-h-[100px] resize-none"
                            placeholder="Describe your product in detail..."
                            maxLength={2000}
                        />
                    </div>
                </div>
            )}

            {/* Step 2: Pricing */}
            {step === 2 && (
                <div className="px-4 py-6 space-y-5 fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold">Set Your Price</h2>
                        <p className="text-sm text-[#AAA] mt-1">Configure auction pricing</p>
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-[#25F4EE]" /> Starting Bid
                        </label>
                        <input
                            type="number"
                            value={form.starting_bid}
                            onChange={(e) => updateForm('starting_bid', e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-lg font-bold"
                            placeholder="1.00"
                            step="0.01"
                            min="0.01"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-2 block">Bid Increment</label>
                        <input
                            type="number"
                            value={form.bid_increment}
                            onChange={(e) => updateForm('bid_increment', e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-sm"
                            placeholder="1.00"
                            step="0.01"
                            min="0.01"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-2 block">Retail Price (optional)</label>
                        <input
                            type="number"
                            value={form.retail_price}
                            onChange={(e) => updateForm('retail_price', e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-sm"
                            placeholder="Original retail price"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-2 block">Reserve Price (optional)</label>
                        <input
                            type="number"
                            value={form.reserve_price}
                            onChange={(e) => updateForm('reserve_price', e.target.value)}
                            className="w-full bg-[#111] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white outline-none focus:border-[#FE2C55] text-sm"
                            placeholder="Minimum price to sell"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#FE2C55]" /> Auction Duration
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {DURATIONS.map(d => (
                                <button
                                    key={d.hours}
                                    onClick={() => updateForm('duration_hours', d.hours)}
                                    className={`py-3 rounded-xl text-sm font-medium ${form.duration_hours === d.hours ? 'bg-[#FE2C55] text-white' : 'bg-[#111] border border-[#1F1F1F] text-[#AAA]'}`}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Review & Publish */}
            {step === 3 && (
                <div className="px-4 py-6 space-y-4 fade-in">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold">Review & Publish</h2>
                        <p className="text-sm text-[#AAA] mt-1">Everything look good?</p>
                    </div>

                    <div className="bg-[#111] rounded-2xl border border-[#1F1F1F] overflow-hidden">
                        {images[0] && <img src={images[0]} className="w-full h-48 object-cover" />}
                        <div className="p-4 space-y-3">
                            <h3 className="text-lg font-bold">{form.title}</h3>
                            <div className="flex gap-2">
                                <span className="bg-[#1F1F1F] px-3 py-1 rounded-full text-xs">{form.category}</span>
                                <span className="bg-[#1F1F1F] px-3 py-1 rounded-full text-xs">{form.condition}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-[#AAA]">Starting Bid</p>
                                    <p className="text-lg font-bold text-[#25F4EE]">${form.starting_bid}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#AAA]">Duration</p>
                                    <p className="text-lg font-bold">{DURATIONS.find(d => d.hours === form.duration_hours)?.label}</p>
                                </div>
                            </div>
                            {form.tiktok_video_url && (
                                <div className="flex items-center gap-2 text-xs text-[#25F4EE]">
                                    <Video className="w-4 h-4" /> TikTok video attached
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Platform fee notice */}
                    <div className="bg-[#111] rounded-xl p-3 border border-[#1F1F1F] flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#25F4EE]" />
                        <div>
                            <p className="text-xs font-bold">Platform Fee: 10%</p>
                            <p className="text-xs text-[#AAA]">Deducted from winning bid upon sale completion</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/95 backdrop-blur-sm border-t border-[#1F1F1F] px-4 py-3 z-50">
                {step < 3 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        disabled={!canNext()}
                        className="w-full bg-[#FE2C55] text-white font-bold py-3.5 rounded-full text-sm disabled:opacity-30 active:scale-95 transition-transform"
                    >
                        Continue
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] text-white font-bold py-3.5 rounded-full text-sm disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                    >
                        <Rocket className="w-5 h-5" />
                        {submitting ? 'Publishing...' : 'Publish Auction'}
                    </button>
                )}
            </div>

            {showVideoPicker && (
                <TikTokVideoPicker
                    onSelect={(url) => { updateForm('tiktok_video_url', url); setShowVideoPicker(false); }}
                    onClose={() => setShowVideoPicker(false)}
                />
            )}
        </div>
    );
}
