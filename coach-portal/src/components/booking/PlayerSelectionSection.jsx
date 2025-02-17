import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const positions = [
    { value: 'goalkeeper', label: 'Goalkeeper' },
    { value: 'defender', label: 'Defender' },
    { value: 'midfielder', label: 'Midfielder' },
    { value: 'forward', label: 'Forward' }
];

const teamLevels = [
    { value: 'recreational', label: 'Recreational' },
    { value: 'competitive', label: 'Competitive' },
    { value: 'elite', label: 'Elite' },
    { value: 'academy', label: 'Academy' },
    { value: 'school', label: 'School Team' }
];

const PlayerSelectionSection = ({ 
    user, 
    players, 
    selectedPlayer, 
    onPlayerSelect, 
    guestPlayerInfo, 
    onGuestInfoChange 
}) => {
    const location = useLocation();

    if (user) {
        return (
            <div>
                <h3 className="text-xl font-semibold mb-4">Select Player</h3>
                {players.length > 0 ? (
                    <div className="space-y-3">
                        {players.map(player => (
                            <button
                                key={player.id}
                                onClick={() => onPlayerSelect(player.id)}
                                className={`w-full p-3 border rounded-lg flex items-center hover:border-blue-500 transition-colors ${
                                    selectedPlayer === player.id ? 'border-blue-500 bg-blue-50' : ''
                                }`}
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    {player.profile_picture ? (
                                        <img
                                            src={player.profile_picture}
                                            alt={`${player.first_name}'s profile`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <i className="fas fa-user text-gray-400"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">
                                        {player.first_name} {player.last_name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {player.primary_position}
                                    </div>
                                </div>
                                {selectedPlayer === player.id && (
                                    <div className="ml-auto text-blue-500">
                                        <i className="fas fa-check-circle"></i>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <div className="text-gray-400 mb-2">
                            <i className="fas fa-user-plus text-3xl"></i>
                        </div>
                        <p className="text-gray-600 mb-2">No players found</p>
                        <a 
                            href="/profile" 
                            className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                            Add a player in your profile
                        </a>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Player Information</h3>
                <Link 
                    to="/login"
                    state={{ from: location }}
                    className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-2"
                >
                    <i className="fas fa-sign-in-alt"></i>
                    Sign in to access your players
                </Link>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={guestPlayerInfo.firstName}
                            onChange={onGuestInfoChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={guestPlayerInfo.lastName}
                            onChange={onGuestInfoChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={guestPlayerInfo.dateOfBirth}
                        onChange={onGuestInfoChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Position Selects */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Primary Position
                        </label>
                        <select
                            name="primaryPosition"
                            value={guestPlayerInfo.primaryPosition}
                            onChange={onGuestInfoChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Position</option>
                            {positions.map(pos => (
                                <option key={pos.value} value={pos.value}>
                                    {pos.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Secondary Position
                        </label>
                        <select
                            name="secondaryPosition"
                            value={guestPlayerInfo.secondaryPosition}
                            onChange={onGuestInfoChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Position</option>
                            {positions.map(pos => (
                                <option key={pos.value} value={pos.value}>
                                    {pos.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Foot
                        </label>
                        <select
                            name="preferredFoot"
                            value={guestPlayerInfo.preferredFoot}
                            onChange={onGuestInfoChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Foot</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Team Level
                        </label>
                        <select
                            name="teamLevel"
                            value={guestPlayerInfo.teamLevel}
                            onChange={onGuestInfoChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Level</option>
                            {teamLevels.map(level => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Team
                    </label>
                    <input
                        type="text"
                        name="currentTeam"
                        value={guestPlayerInfo.currentTeam}
                        onChange={onGuestInfoChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Optional"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        High School Graduation Year
                    </label>
                    <input
                        type="number"
                        name="graduationYear"
                        value={guestPlayerInfo.graduationYear}
                        onChange={onGuestInfoChange}
                        min={new Date().getFullYear()}
                        max={new Date().getFullYear() + 6}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Optional"
                    />
                </div>

                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    <i className="fas fa-info-circle mr-2"></i>
                    Contact information will be collected during checkout
                </div>
            </div>
        </div>
    );
};

export default PlayerSelectionSection;
