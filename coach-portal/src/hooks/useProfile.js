import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../contexts/AuthContext';

export const useProfile = () => {
    const { isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        if (!isAuthenticated) {
            setProfile(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const authData = JSON.parse(localStorage.getItem('auth'));
            
            const response = await fetch(API_ENDPOINTS.profile, {
                headers: {
                    'Authorization': `Bearer ${authData.token}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch profile');

            const data = await response.json();
            setProfile(data);
        } catch (err) {
            console.error('Profile fetch error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [isAuthenticated]); // Refetch when auth state changes

    return { 
        profile, 
        loading, 
        error, 
        refreshProfile: fetchProfile 
    };
}; 