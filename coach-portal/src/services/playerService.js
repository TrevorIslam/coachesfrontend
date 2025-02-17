import { API_ENDPOINTS } from '../config/api';

export const playerService = {
  async getPlayers(token) {
    const response = await fetch(API_ENDPOINTS.players, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }

    return await response.json();
  },

  async createPlayer(playerData, token) {
    const response = await fetch(API_ENDPOINTS.players, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(playerData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create player');
    }

    return await response.json();
  },

  async updatePlayer(id, playerData, token) {
    const response = await fetch(API_ENDPOINTS.playerById(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(playerData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update player');
    }

    return await response.json();
  },

  async deletePlayer(id, token) {
    const response = await fetch(API_ENDPOINTS.playerById(id), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete player');
    }

    return await response.json();
  }
}; 