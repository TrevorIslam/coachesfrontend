import { API_ENDPOINTS } from '../config/api';
import { isValidEmail, isValidPassword } from '../utils/validation';

export const authService = {
    login: async (email, password) => {
        const response = await fetch(API_ENDPOINTS.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Check if response is ok before trying to parse JSON
        if (!response.ok) {
            // Try to parse error message if available
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || `Login failed with status: ${response.status}`);
            } catch (e) {
                // If JSON parsing fails, throw generic error with status
                throw new Error(`Login failed with status: ${response.status}`);
            }
        }

        // Parse JSON only for successful responses
        const data = await response.json();

        // Store auth data in localStorage with updated coach data structure
        localStorage.setItem('auth', JSON.stringify({
            token: data.access_token,
            expiresAt: data.expires_at,
            refreshToken: data.refresh_token,
            user: {
                id: data.coach.id,
                authId: data.coach.auth_id,
                email: data.coach.email,
                status: data.coach.status
            }
        }));

        return data.coach;
    },

    signup: async (userData) => {
        if (!isValidEmail(userData.email)) {
            throw new Error('Please enter a valid email address');
        }

        if (!isValidPassword(userData.password)) {
            throw new Error('Password must be at least 8 characters long and include a number and a special character');
        }

        const response = await fetch(API_ENDPOINTS.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                // Note: firstName and lastName will be handled in a separate profile update
                // after account approval
            }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || data.error || 'Error creating account');
        }

        // Return the user data from the response
        return data.user;
    },

    logout: () => {
        localStorage.removeItem('auth');
    },

    checkAuth: () => {
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            if (!authData) return null;

            // Check if token is expired
            const now = Math.floor(Date.now() / 1000);
            if (now >= authData.expiresAt) {
                localStorage.removeItem('auth');
                return null;
            }

            return authData.user;
        } catch (error) {
            console.error('Auth check error:', error);
            return null;
        }
    },

    refreshToken: async () => {
        const authData = JSON.parse(localStorage.getItem('auth'));
        if (!authData?.refreshToken) return null;

        try {
            const response = await fetch(API_ENDPOINTS.refresh, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: authData.refreshToken
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // Update stored auth data
            localStorage.setItem('auth', JSON.stringify({
                ...authData,
                token: data.access_token,
                expiresAt: data.expires_at,
                refreshToken: data.refresh_token
            }));

            return true;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    }
}; 