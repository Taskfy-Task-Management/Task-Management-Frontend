import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/watchlist'; 

// Get all tasks in a user's watchlist
export const getWatchlist = (userId) => axios.get(`${API_BASE_URL}/${userId}`);

// Add a task to the user's watchlist
export const addToWatchlist = (userId, taskId) =>
  axios.post(API_BASE_URL, { userId, taskId });

// Remove a task from the user's watchlist
export const removeFromWatchlist = (userId, taskId) =>
  axios.delete(API_BASE_URL, { data: { userId, taskId } });
