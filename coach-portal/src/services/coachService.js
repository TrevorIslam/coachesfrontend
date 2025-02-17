import { API_ENDPOINTS } from '../config/api';

export const coachService = {
    async getCoaches() {
        try {
            const response = await fetch(API_ENDPOINTS.coaches, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch coaches');
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error fetching coaches:', error);
            throw error;
        }
    }
}; 