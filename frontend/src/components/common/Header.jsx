// frontend/src/components/common/Header.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Fix the import path

// ... rest of your Header.jsx code

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
              <span className="text-white font-bold text-xl">🧠</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Mansaathi</h1>
              <p className="text-white/80 text-xs font-light">Mindful Living Companion</p>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-white/80 text-sm">Welcome back</p>
              <p className="text-white font-semibold">
                {user?.profile?.firstName || user?.username || 'Friend'}
              </p>
            </div>
            
            {/* User Avatar */}
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
              <span className="text-white font-semibold text-sm">
                {(user?.profile?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
              </span>
            </div>
            
            <button
              onClick={logout}
              className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </header>
  );
};

export default Header;