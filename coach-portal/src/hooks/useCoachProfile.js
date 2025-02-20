import { useState, useEffect } from 'react';
import { coachProfileService } from '../services/coachProfileService';

export const useCoachProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const profileData = await coachProfileService.getProfile(authData.token);
            setProfile(profileData);
            return profileData;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Fetch profile on mount
    useEffect(() => {
        fetchProfile();
    }, []);

    const uploadProfilePicture = async (file) => {
        setLoading(true);
        setError(null);

        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const result = await coachProfileService.uploadProfilePicture(file, authData.token);
            return result.url;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            
            // Format the data according to the backend's expected structure
            const profileData = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone_number,
                hometown: formData.hometown,
                position: formData.position,
                grad_year: formData.graduation_year,
                eligibility_class: formData.eligibility_class,
                profile_picture_url: formData.profile_picture_url
            };

            const data = await coachProfileService.updateProfile(profileData, authData.token);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        updateProfile,
        uploadProfilePicture,
        fetchProfile,
        loading,
        error
    };
}; 