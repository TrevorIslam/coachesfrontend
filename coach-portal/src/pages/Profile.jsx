import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { usePlayers } from '../hooks/usePlayers';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
    const { isAuthenticated } = useAuth();
    const { players, loading: playersLoading, refreshPlayers, deletePlayer } = usePlayers();
    const { profile, loading: profileLoading, error } = useProfile();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showManageMenu, setShowManageMenu] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (profileLoading) {
        return <LoadingSpinner />;
    }

    const handleCreatePlayer = async (newPlayer) => {
        setIsModalOpen(false);
        await refreshPlayers();
    };

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleDeletePlayer = async (player) => {
        if (window.confirm(`Are you sure you want to delete ${player.first_name} ${player.last_name}?`)) {
            try {
                await deletePlayer(player.id);
            } catch (error) {
                console.error('Error deleting player:', error);
                alert('Failed to delete player. Please try again.');
            }
        }
    };

    const handleEditClick = (player) => {
        setSelectedPlayer(player);
        setEditModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* User Info Section */}
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
                    <div>
                        {profileLoading ? (
                            <div className="animate-pulse">
                                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold">
                                    {profile?.first_name ? `${profile.first_name} ${profile.last_name}` : profile?.email}
                                </h1>
                                <p className="text-gray-600">{profile?.email}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Players Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">My Players</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add New Player
                    </button>
                </div>

                {playersLoading ? (
                    <div className="text-center py-8">
                        <i className="fas fa-spinner fa-spin text-primary text-2xl"></i>
                        <p className="text-gray-600 mt-2">Loading players...</p>
                    </div>
                ) : players.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {players.map((player) => (
                            <div 
                                key={player.id} 
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow relative group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <i className="fas fa-user text-gray-400" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">
                                            {player.first_name} {player.last_name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {player.primary_position} • Age: {calculateAge(player.date_of_birth)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {player.current_team} - {player.team_level}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(player)}
                                            className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                                            title="Edit Player"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDeletePlayer(player)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="Delete Player"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-400 mb-3">
                            <i className="fas fa-users text-4xl"></i>
                        </div>
                        <p className="text-gray-600 mb-4">You haven't added any players yet</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="text-primary hover:text-primary-dark transition-colors"
                        >
                            Add your first player
                        </button>
                    </div>
                )}
            </div>

            <CreatePlayerModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreatePlayer}
            />

            {selectedPlayer && (
                <EditPlayerModal 
                    isOpen={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedPlayer(null);
                        refreshPlayers();
                    }}
                    player={selectedPlayer}
                />
            )}
        </div>
    );
};

export default Profile;