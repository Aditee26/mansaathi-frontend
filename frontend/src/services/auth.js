// C:/Users/Aditee Singh/OneDrive/Desktop/mansaathi/frontend/src/services/auth.js
import api from './api.js';

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getProfile: () => api.get('/auth/profile'),
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data.user;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
};