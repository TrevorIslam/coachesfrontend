import { useState, useEffect } from 'react';
import { playerService } from '../services/playerService';
import { useAuth } from '../contexts/AuthContext';

export const usePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem('auth'));
      const data = await playerService.getPlayers(authData?.token);
      setPlayers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPlayer = async (playerData) => {
    try {
      const authData = JSON.parse(localStorage.getItem('auth'));
      const newPlayer = await playerService.createPlayer(playerData, authData?.token);
      setPlayers(prev => [...prev, newPlayer]);
      return newPlayer;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePlayer = async (id, playerData) => {
    try {
      const authData = JSON.parse(localStorage.getItem('auth'));
      const updatedPlayer = await playerService.updatePlayer(id, playerData, authData?.token);
      setPlayers(prev => prev.map(player => 
        player.id === id ? updatedPlayer : player
      ));
      return updatedPlayer;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePlayer = async (id) => {
    try {
      const authData = JSON.parse(localStorage.getItem('auth'));
      await playerService.deletePlayer(id, authData?.token);
      setPlayers(prev => prev.filter(player => player.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchPlayers();
    }
  }, [user]);

  return {
    players,
    loading,
    error,
    createPlayer,
    updatePlayer,
    deletePlayer,
    refreshPlayers: fetchPlayers
  };
}; 