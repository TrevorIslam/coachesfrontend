const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/coach-auth/signin`,
  signup: `${API_BASE_URL}/coach-auth/signup`,
  signout: `${API_BASE_URL}/coach-auth/signout`,
  refreshToken: `${API_BASE_URL}/coach-auth/refresh`,
  coaches: `${API_BASE_URL}/api/coaches`,
  coachAvailability: (id) => `${API_BASE_URL}/api/coaches/${id}/availability`,
  players: `${API_BASE_URL}/api/players`,
  playerById: (id) => `${API_BASE_URL}/api/players/${id}`,
  profile: `${API_BASE_URL}/api/users/profile`,
  coachProfile: `${API_BASE_URL}/api/coaches/profile`,
  profilePicture: `${API_BASE_URL}/api/coaches/profile-picture`,
};

export default API_BASE_URL;