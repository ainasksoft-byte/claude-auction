import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.get('/auth/me');
            setUser(data);
            setError(null);
        } catch (err) {
            setUser(null);
            if (err.response?.status === 401) {
                localStorage.removeItem('auth_token');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        return data;
    };

    const register = async (name, email, password, passwordConfirmation) => {
        const { data } = await api.post('/auth/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            // ignore
        }
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            isAuthenticated: !!user,
            login,
            register,
            logout,
            refreshUser: fetchUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
