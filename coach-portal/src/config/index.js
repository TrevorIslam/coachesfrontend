import { API_ENDPOINTS } from './api';

export const CONFIG = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    // Add other environment-based config here
};

export { API_ENDPOINTS }; 