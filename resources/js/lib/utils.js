export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}

export function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date));
}

export function formatTimeRemaining(ms) {
    if (ms <= 0) return 'Ended';
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

export function extractTikTokVideoId(url) {
    if (!url) return null;
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : null;
}

export function validateTikTokUrl(url) {
    if (!url) return true;
    return /^https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/.test(url);
}

export function getStatusColor(status) {
    switch (status) {
        case 'live': return 'bg-green-500';
        case 'ending_soon': return 'bg-tiktok-red';
        case 'upcoming': return 'bg-tiktok-cyan';
        case 'ended': return 'bg-gray-500';
        default: return 'bg-gray-500';
    }
}

export function getStatusText(status) {
    switch (status) {
        case 'live': return 'Live';
        case 'ending_soon': return 'Ending Soon';
        case 'upcoming': return 'Upcoming';
        case 'ended': return 'Ended';
        default: return status;
    }
}
