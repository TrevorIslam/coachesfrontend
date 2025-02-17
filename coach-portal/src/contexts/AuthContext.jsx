import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for existing auth on mount
        const checkAuth = () => {
            try {
                const authString = localStorage.getItem('auth');
                if (!authString) return;
                
                const authData = JSON.parse(authString);
                if (!authData?.user || !authData?.expiresAt) {
                    localStorage.removeItem('auth');
                    setUser(null);
                    return;
                }

                // Check if token is expired
                const now = Math.floor(Date.now() / 1000);
                if (now >= authData.expiresAt) {
                    localStorage.removeItem('auth');
                    setUser(null);
                    return;
                }

                setUser(authData.user);
            } catch (error) {
                console.error('Auth check error:', error);
                localStorage.removeItem('auth');  // Clear invalid data
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem('auth');
        setUser(null);
        // Clear any cart data from localStorage to start fresh guest cart
        localStorage.removeItem('guestCart');
    };

    // Keep only essential auth data in the context
    const authData = {
        user: user ? {
            id: user.id,
            email: user.email,
            // Only keep fields needed for authentication
        } : null,
        isAuthenticated: !!user,
        setUser,
        logout: () => {
            localStorage.removeItem('auth');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 