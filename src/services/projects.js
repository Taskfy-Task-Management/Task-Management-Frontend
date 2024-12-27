import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/projects'; // Adjust based on your backend API

// -------------------- Projects Services --------------------

// Get all projects for a user
export const getAllProjects = (userId) => axios.get(`${API_BASE_URL}/${userId}`);

// Get a specific project by ID
export const getProjectById = (projectId) =>
  axios.get(`${API_BASE_URL}/details/${projectId}`);

// Create a new project
export const createProject = (data) => axios.post(API_BASE_URL, data);

// Update an existing project
export const updateProject = (projectId, data) =>
  axios.put(`${API_BASE_URL}/${projectId}`, data);

// Delete a project
export const deleteProject = (projectId) =>
  axios.delete(`${API_BASE_URL}/${projectId}`);

// -------------------- Tasks Services --------------------

const API_BASE_URL2 = 'http://localhost:3000/tasks'; 

// Get all tasks for a specific project
export const getTasksByProject = (projectId) =>
  axios.get(`${API_BASE_URL2}/project/${projectId}`);

// Create a new task for a specific project
export const createTask = (data) => axios.post(`${API_BASE_URL2}`, data);

// Delete a task by ID
export const deleteTask = (taskId) =>
  axios.delete(`${API_BASE_URL2}/${taskId}`);
