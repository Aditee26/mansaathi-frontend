// frontend/src/services/api.js
import axios from 'axios';

// Use absolute URL for development
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API Request:', config.method?.toUpperCase(), config.url); // Debug log
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data); // Debug log
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data); // Debug log
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - backend may be down');
      throw new Error('Cannot connect to server. Please check if backend is running.');
    }
    
    return Promise.reject(error);
  }
);

// Test connection function
export const testConnection = async () => {
  try {
    const response = await api.get('/test');
    return response.data;
  } catch (error) {
    throw new Error('Backend connection failed');
  }
};

export const moodAPI = {
  logMood: (data) => api.post('/mood/log', data),
  getHistory: (days = 30) => api.get(`/mood/history?days=${days}`),
  getAnalytics: (days = 30) => api.get(`/mood/analytics?days=${days}`),
};

export const journalAPI = {
  createEntry: (data) => api.post('/journal/entries', data),
  getEntries: (params = {}) => api.get('/journal/entries', { params }),
  getEntry: (id) => api.get(`/journal/entries/${id}`),
  updateEntry: (id, data) => api.put(`/journal/entries/${id}`, data),
  deleteEntry: (id) => api.delete(`/journal/entries/${id}`),
};

export const meditationAPI = {
  getSessions: () => api.get('/meditation/sessions'),
  startSession: (data) => api.post('/meditation/sessions/start', data),
  completeSession: (id, data) => api.post(`/meditation/sessions/${id}/complete`, data),
  getStats: () => api.get('/meditation/stats'),
};

export default api;