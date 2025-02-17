import { API_ENDPOINTS } from '../config/api';

export const cartService = {
    async fetchCart(token) {
        const response = await fetch(API_ENDPOINTS.cart, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Received non-JSON response from server");
        }

        return await response.json();
    },

    async addToCart(sessionDetails, token) {
        const response = await fetch(API_ENDPOINTS.cart, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                session_type: sessionDetails.session_type,
                coach_id: sessionDetails.coach_id,
                session_date: sessionDetails.session_date,
                session_time: sessionDetails.session_time,
                notes: sessionDetails.notes || '',
                quantity: 1,
                player_id: sessionDetails.player_id
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    },

    async removeFromCart(itemId, token) {
        const response = await fetch(`${API_ENDPOINTS.cart}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },

    async mergeGuestCart(guestCartData, token) {
        const guestItems = typeof guestCartData === 'string' 
            ? JSON.parse(guestCartData) 
            : guestCartData;

        const formattedItems = guestItems.map(item => ({
            session_type: item.session_type,
            coach_id: item.coach_id,
            session_date: item.session_date,
            session_time: item.session_time,
            quantity: item.quantity || 1,
            notes: item.notes || '',
        }));

        const response = await fetch(`${API_ENDPOINTS.cart}/merge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formattedItems)
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${error}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
    }
}; 