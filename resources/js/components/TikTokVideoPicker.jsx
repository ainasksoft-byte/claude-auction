import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import api from '../lib/api';

export default function TikTokVideoPicker({ isOpen, onClose, onSelect }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        if (!isOpen) return;

        const fetchVideos = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/tiktok/videos');
                setVideos(data.videos || []);
            } catch (err) {
                setError('Failed to load TikTok videos. Make sure your TikTok account is connected.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredVideos = videos.filter(v =>
        !search || (v.title || v.video_description || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
            <div className={`relative w-full max-w-lg max-h-[80vh] rounded-2xl overflow-hidden flex flex-col ${
                isDark ? 'bg-[#1a1a1a]' : 'bg-white'
            }`}>
                <div className={`p-4 border-b ${isDark ? 'border-[#262626]' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold">Select TikTok Video</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search videos..."
                        className={`w-full px-3 py-2 rounded-lg text-sm ${
                            isDark ? 'bg-[#262626] text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900'
                        }`}
                    />
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {loading && (
                        <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-2 border-tiktok-red border-t-transparent rounded-full mx-auto"></div>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-8">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                    {!loading && !error && filteredVideos.length === 0 && (
                        <p className="text-center text-gray-400 py-8">No videos found</p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        {filteredVideos.map(video => (
                            <button
                                key={video.id}
                                onClick={() => { onSelect(video.share_url || video.embed_link); onClose(); }}
                                className={`rounded-xl overflow-hidden text-left transition hover:ring-2 hover:ring-tiktok-red ${
                                    isDark ? 'bg-[#262626]' : 'bg-gray-50'
                                }`}
                            >
                                <img
                                    src={video.cover_image_url}
                                    alt={video.title}
                                    className="w-full aspect-[9/16] object-cover"
                                />
                                <div className="p-2">
                                    <p className="text-xs font-medium truncate">{video.title || video.video_description || 'Untitled'}</p>
                                    <p className="text-[10px] text-gray-400">{video.view_count?.toLocaleString() || 0} views</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
