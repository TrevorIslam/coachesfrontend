import { useState, useEffect } from 'react';
import { coachService } from '../services/coachService';

export const useCoaches = () => {
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const data = await coachService.getCoaches();
                setCoaches(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCoaches();
    }, []);

    return { coaches, loading, error };
};