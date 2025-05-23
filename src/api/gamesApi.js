import axios from 'axios';

const API_URL = 'http://localhost:3001'; // json-server port

export const getGames = async () => {
  const response = await axios.get(`${API_URL}/games`);
  return response.data;
};

export const updateGame = async (id, updatedGame) => {
  const response = await axios.put(`${API_URL}/games/${id}`, updatedGame);
  return response.data;
};

export const deleteGame = async (id) => {
  const response = await axios.delete(`${API_URL}/games/${id}`);
  return response.data;
};

export const addGame = async (newGame) => {
  const response = await axios.post(`${API_URL}/games`, newGame);
  return response.data;
};