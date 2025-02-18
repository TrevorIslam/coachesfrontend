import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
    const { isAuthenticated } = useAuth();
    const { profile, loading: profileLoading, error } = useProfile();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (profileLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Coach Info Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {profile?.profile_picture_url ? (
                            <img 
                                src={profile.profile_picture_url} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <i className="fas fa-user text-gray-400 text-3xl" />
                        )}
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : profile?.email}
                                </h1>
                                <p className="text-gray-600">{profile?.email}</p>
                                <p className="text-gray-600">{profile?.phone_number}</p>
                            </div>
                            <button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                <i className="fas fa-edit mr-2"></i>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coaching Details */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Coaching Information</h2>
                        <div>
                            <p className="text-gray-600 mb-1">Specializations</p>
                            <div className="flex flex-wrap gap-2">
                                {profile?.specializations?.map((spec, index) => (
                                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                        {spec}
                                    </span>
                                )) || 'Not specified'}
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Experience Level</p>
                            <p>{profile?.experience_level || 'Not specified'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-1">Certifications</p>
                            <ul className="list-disc list-inside">
                                {profile?.certifications?.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                )) || <li>No certifications listed</li>}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Stats & Metrics</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 text-sm">Total Sessions</p>
                                <p className="text-2xl font-bold text-primary">
                                    {profile?.total_sessions || 0}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 text-sm">Active Clients</p>
                                <p className="text-2xl font-bold text-primary">
                                    {profile?.active_clients || 0}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 text-sm">Rating</p>
                                <p className="text-2xl font-bold text-primary">
                                    {profile?.rating || '0.0'} <span className="text-sm">/ 5.0</span>
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 text-sm">Reviews</p>
                                <p className="text-2xl font-bold text-primary">
                                    {profile?.review_count || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                        {profile?.bio || 'No bio provided yet.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;