import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function TikTokEmbed({ url }) {
    const [embedHtml, setEmbedHtml] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!url) return;

        const fetchEmbed = async () => {
            try {
                const response = await fetch(`/api/tiktok/oembed?url=${encodeURIComponent(url)}`);
                if (!response.ok) throw new Error('Failed to load');
                const data = await response.json();
                setEmbedHtml(data.html);
            } catch (err) {
                setError('Unable to load TikTok video');
            } finally {
                setLoading(false);
            }
        };

        fetchEmbed();
    }, [url]);

    if (!url) return null;

    if (loading) {
        return (
            <div className={`rounded-xl p-8 text-center ${theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-100'}`}>
                <div className="animate-spin w-8 h-8 border-2 border-tiktok-red border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-3 text-sm text-gray-400">Loading TikTok video...</p>
            </div>
        );
    }

    if (error || !embedHtml) {
        return (
            <div className={`rounded-xl p-6 text-center ${theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-100'}`}>
                <p className="text-gray-400 text-sm">{error || 'Video unavailable'}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-tiktok-cyan text-sm mt-2 inline-block hover:underline">
                    View on TikTok
                </a>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md" dangerouslySetInnerHTML={{ __html: embedHtml }} />
        </div>
    );
}
