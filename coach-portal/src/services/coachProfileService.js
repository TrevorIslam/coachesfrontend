import { API_ENDPOINTS } from '../config/api';

export const coachProfileService = {
    async uploadProfilePicture(file, token) {
        const pictureData = new FormData();
        pictureData.append('image', file);

        const response = await fetch(API_ENDPOINTS.profilePicture, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: pictureData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to upload profile picture');
        }

        return await response.json();
    },

    async updateProfile(profileData, token) {
        const response = await fetch(API_ENDPOINTS.coachProfile, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update profile');
        }

        return await response.json();
    },

    async getProfile(token) {
        const response = await fetch(API_ENDPOINTS.coachProfile, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch profile');
        }

        return await response.json();
    }
};