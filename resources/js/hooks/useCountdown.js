import { useState, useEffect } from 'react';

export function useCountdown(endTime) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(endTime));
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return timeLeft;
}

function calculateTimeLeft(endTime) {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isUrgent: false, isEnded: true, totalMs: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const isUrgent = diff < 5 * 60 * 1000;

    return { days, hours, minutes, seconds, isUrgent, isEnded: false, totalMs: diff };
}
