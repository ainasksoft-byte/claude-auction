import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext();

let toastId = 0;
let addToastFn = null;

export function toast(message, type = 'info') {
    if (addToastFn) {
        addToastFn({ id: ++toastId, message, type });
    }
}

export function Toaster() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        addToastFn = (toast) => {
            setToasts(prev => [...prev, toast]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== toast.id));
            }, 4000);
        };
        return () => { addToastFn = null; };
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm max-w-sm animate-slide-in ${
                        t.type === 'success' ? 'bg-green-600' :
                        t.type === 'error' ? 'bg-red-600' :
                        t.type === 'warning' ? 'bg-yellow-600' :
                        'bg-gray-700'
                    }`}
                >
                    {t.message}
                </div>
            ))}
        </div>
    );
}
