// frontend/src/components/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { testConnection } from '../../services/api.js';

const Login = () => {
  const [email, setEmail] = useState('aditeesingh001@gmail.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const { login, error, clearError, user } = useAuth();
  const navigate = useNavigate();

  // Test backend connection on component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await testConnection();
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('disconnected');
        console.error('Backend connection failed:', error);
      }
    };
    
    checkBackend();
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log('User is logged in, redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    if (backendStatus !== 'connected') {
      alert('Backend server is not connected. Please make sure the backend is running on port 5000.');
      return;
    }
    
    setIsLoading(true);
    clearError();
    
    try {
      console.log('Calling login function...');
      const result = await login(email, password);
      console.log('Login successful, result:', result);
      
      // The useEffect above will handle redirect when user state updates
      // But let's also force redirect here
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
      
    } catch (error) {
      console.error('Login failed in component:', error);
      // Error is already set in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to MindSpace</h2>
        
        {/* Backend Status */}
        <div className={`mb-4 p-3 rounded text-sm ${
          backendStatus === 'connected' ? 'bg-green-100 text-green-800' : 
          backendStatus === 'disconnected' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          Backend: {
            backendStatus === 'connected' ? '✅ Connected' :
            backendStatus === 'disconnected' ? '❌ Disconnected' :
            '⏳ Checking...'
          }
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || backendStatus !== 'connected'}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Debug info */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <p className="font-semibold">Debug Info:</p>
          <p>Backend: {backendStatus === 'connected' ? '✅ Connected' : '❌ Disconnected'}</p>
          <p>Token: {localStorage.getItem('token') ? '✅ Exists' : '❌ None'}</p>
          <p>User: {user ? '✅ Logged In' : '❌ Not Logged In'}</p>
          <p>Email: {email}</p>
          <p>Password: {'*'.repeat(password.length)}</p>
        </div>
        
        {backendStatus === 'disconnected' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800 text-sm font-semibold">Backend Connection Issue</p>
            <p className="text-red-700 text-xs mt-1">
              Make sure the backend server is running. Open a terminal and run:
            </p>
            <code className="text-red-900 text-xs bg-red-100 p-1 rounded block mt-1">
              cd backend && npm run dev
            </code>
          </div>
        )}
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;