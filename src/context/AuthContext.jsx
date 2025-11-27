// C:/Users/Aditee Singh/OneDrive/Desktop/mansaathi/frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authAPI.verifyToken();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      const response = await authAPI.login(email, password);
      console.log('Login response:', response); // Debug log
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      const message = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);
      const response = await authAPI.register(userData);
      console.log('Register response:', response); // Debug log
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Register error:', error); // Debug log
      const message = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Add this to your AuthContext.jsx in the logout function
const logout = () => {
  console.log('Logging out...');
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // Clear any stored user data
  setUser(null);
  setError('');
  // Force reload to clear any cached state
  window.location.href = '/login';
};

  const clearError = () => {
    setError('');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};