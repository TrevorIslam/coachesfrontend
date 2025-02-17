import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { cartService } from '../services/cartService';

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const loadCart = async () => {
        setIsLoading(true);
        try {
            if (user) {
                const authData = JSON.parse(localStorage.getItem('auth'));
                const data = await cartService.fetchCart(authData?.token);
                setCartItems(data.items || []);
            } else {
                const localCart = localStorage.getItem('guestCart');
                setCartItems(localCart ? JSON.parse(localCart) : []);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            setCartItems([]);
            if (!user) {
                localStorage.removeItem('guestCart');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Only load cart when user changes, don't try to merge
        loadCart();
    }, [user]);

    const addItem = async (sessionDetails) => {
        try {
            if (user) {
                const authData = JSON.parse(localStorage.getItem('auth'));
                const data = await cartService.addToCart(sessionDetails, authData?.token);
                await loadCart();
                return data;
            } else {
                const guestCartItem = {
                    id: `guest_${Date.now()}`,
                    session_type: sessionDetails.session_type,
                    coach_id: sessionDetails.coach_id,
                    session_date: sessionDetails.session_date,
                    session_time: sessionDetails.session_time,
                    notes: sessionDetails.notes || '',
                    quantity: 1,
                    status: 'in_cart',
                    session_title: sessionDetails.session_title,
                    coach_name: sessionDetails.coach_name,
                    price: sessionDetails.price,
                    player_id: sessionDetails.player_id,
                    player_first_name: sessionDetails.player_first_name,
                    player_last_name: sessionDetails.player_last_name
                };

                const updatedItems = [...cartItems, guestCartItem];
                setCartItems(updatedItems);
                localStorage.setItem('guestCart', JSON.stringify(updatedItems));
                return guestCartItem;
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    };

    const removeItem = async (itemId) => {
        try {
            if (user) {
                const authData = JSON.parse(localStorage.getItem('auth'));
                await cartService.removeFromCart(itemId, authData?.token);
                setCartItems(prev => prev.filter(item => item.id !== itemId));
            } else {
                const updatedItems = cartItems.filter(item => item.id !== itemId);
                setCartItems(updatedItems);
                localStorage.setItem('guestCart', JSON.stringify(updatedItems));
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    };

    const mergeGuestCart = async (justLoggedInUser = null) => {
        const guestCart = localStorage.getItem('guestCart');
        const currentUser = justLoggedInUser || user;
        
        if (guestCart && currentUser) {
            try {
                const authData = JSON.parse(localStorage.getItem('auth'));
                await cartService.mergeGuestCart(guestCart, authData?.token);
                localStorage.removeItem('guestCart');
                await loadCart();
                return true;
            } catch (error) {
                console.error('Error merging cart:', error);
                throw error;
            }
        }
        return false;
    };

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    const calculateTotals = () => {
        const total = cartItems.reduce((sum, item) => {
            return sum + (Number(item.price) || 0);
        }, 0);
        return {
            total
        };
    };

    return {
        cartItems,
        addItem,
        removeItem,
        formatPrice,
        calculateTotals,
        isLoading,
        mergeGuestCart
    };
}; 