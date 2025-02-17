import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/auth';
import { useCart } from './useCart';

export const useLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { mergeGuestCart } = useCart();
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
            
            try {
                await mergeGuestCart(userData);
            } catch (error) {
                console.error('Error merging cart:', error);
            }
            
            // Get the return path from sessionStorage
            const returnTo = sessionStorage.getItem('returnTo');
            const returnPath = returnTo ? JSON.parse(returnTo) : { pathname: '/' };
            sessionStorage.removeItem('returnTo'); // Clear the stored path
            
            navigate(returnPath.pathname + (returnPath.search || ''));
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