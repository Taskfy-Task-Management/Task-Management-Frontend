import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend base URL

export const login = async (email, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { email, password });
};

export const register = async (name, email, password) => {
  return axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });
};
