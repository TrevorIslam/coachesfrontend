import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth';

export const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const login = async (email, password) => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return false;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        setIsLoading(true);
        setError('');

        try {
            const userData = await authService.login(email, password);
            if (!userData) {
                throw new Error('Login failed');
            }

            setUser(userData);

            // Handle different account statuses
            if (userData.status === 'pending') {
                navigate('/pending-approval');
            } else if (userData.status === 'suspended') {
                throw new Error('Your account has been suspended. Please contact support.');
            } else {
                // If there's a saved return path, use it, otherwise go to dashboard
                const returnTo = location.state?.from || { pathname: '/dashboard' };
                navigate(returnTo);
            }
            return true;
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Failed to connect to the server');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        error,
        isLoading,
        setError
    };
}; 