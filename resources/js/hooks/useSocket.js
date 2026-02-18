import { useState, useEffect, useRef, useCallback } from 'react';

// Simple event-based real-time simulation using polling
// In production, replace with Pusher/Laravel Echo
export function useSocket(auctionId) {
    const [lastUpdate, setLastUpdate] = useState(null);
    const intervalRef = useRef(null);

    const pollForUpdates = useCallback(async () => {
        if (!auctionId) return;
        try {
            const response = await fetch(`/api/auctions/${auctionId}`);
            if (response.ok) {
                const data = await response.json();
                setLastUpdate(data);
            }
        } catch (e) {
            // Silently fail on poll errors
        }
    }, [auctionId]);

    useEffect(() => {
        if (!auctionId) return;

        // Poll every 5 seconds for updates
        intervalRef.current = setInterval(pollForUpdates, 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [auctionId, pollForUpdates]);

    return { lastUpdate, refresh: pollForUpdates };
}
