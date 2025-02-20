import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

export const useSignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        // Require at least 8 characters, one number, and one special character
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const signUp = async (email, password) => {
        setIsLoading(true);
        setError('');

        try {
            if (!isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            if (!isValidPassword(password)) {
                throw new Error('Password must be at least 8 characters long and include a number and a special character');
            }

            await authService.signup({ email, password });
            
            // Navigate to pending approval page
            navigate('/pending-approval', { 
                state: { 
                    message: 'Account created successfully! Please complete your profile for review.',
                }
            });
            return true;
        } catch (error) {
            setError(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signUp,
        error,
        isLoading,
        setError
    };
}; 