const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/signin`,
  signup: `${API_BASE_URL}/auth/signup`,
  refreshToken: `${API_BASE_URL}/auth/refresh`,
  cart: `${API_BASE_URL}/api/cart`,    // Base cart endpoint
  // If you need specific cart endpoints:
  cartAdd: `${API_BASE_URL}/api/cart`,
  cartRemove: (id) => `${API_BASE_URL}/api/cart/${id}`,
  cartMerge: `${API_BASE_URL}/api/cart/merge`,
  createPaymentIntent: `${API_BASE_URL}/api/payment/create-payment-intent`,
  coaches: `${API_BASE_URL}/api/coaches`,
  coachAvailability: (id) => `${API_BASE_URL}/api/coaches/${id}/availability`,
  players: `${API_BASE_URL}/api/players`,
  playerById: (id) => `${API_BASE_URL}/api/players/${id}`,
  profile: `${API_BASE_URL}/api/users/profile`,
};

export default API_BASE_URL;