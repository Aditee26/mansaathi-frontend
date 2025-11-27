// frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    goals: []
  });
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        goals: user.profile?.goals || []
      });
    }
  }, [user]);

  const handleSaveProfile = () => {
    updateUser({
      profile: formData
    });
    setEditMode(false);
  };

  const addGoal = () => {
    if (newGoal.trim() && !formData.goals.includes(newGoal.trim())) {
      setFormData({
        ...formData,
        goals: [...formData.goals, newGoal.trim()]
      });
      setNewGoal('');
    }
  };

  const removeGoal = (goalToRemove) => {
    setFormData({
      ...formData,
      goals: formData.goals.filter(goal => goal !== goalToRemove)
    });
  };

  const getMoodStreak = () => {
    // Simple streak calculation - in real app, calculate from mood entries
    return Math.min(user?.stats?.moodEntries || 0, 7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {user?.profile?.firstName?.[0] || user?.username?.[0] || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {user?.profile?.firstName || user?.username}'s Profile
                </h1>
                <p className="text-blue-100 mt-2">
                  Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg"
            >
              {editMode ? '✕ Cancel' : '✏️ Edit Profile'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Wellness Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Wellness Score</h3>
              <div className="text-center">
                <div className="relative inline-block">
                  <svg className="w-24 h-24" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray="60, 100"
                    />
                    <text x="18" y="20.5" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">
                      {getMoodStreak() * 10}%
                    </text>
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mt-2">Based on your consistency</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">😊</span>
                    </div>
                    <span className="text-gray-700">Mood Entries</span>
                  </div>
                  <span className="font-bold text-blue-600">{user?.stats?.moodEntries || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📔</span>
                    </div>
                    <span className="text-gray-700">Journal Entries</span>
                  </div>
                  <span className="font-bold text-green-600">{user?.stats?.journalEntries || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🧘</span>
                    </div>
                    <span className="text-gray-700">Meditation</span>
                  </div>
                  <span className="font-bold text-purple-600">{user?.stats?.meditationSessions || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📅</span>
                    </div>
                    <span className="text-gray-700">Account Age</span>
                  </div>
                  <span className="font-bold text-orange-600">
                    {user?.createdAt ? Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) : 0} days
                  </span>
                </div>
              </div>
            </div>

            {/* Wellness Tip */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Wellness Tip</h3>
              </div>
              <p className="text-gray-700 text-sm">
                {user?.stats?.moodEntries > 0 
                  ? "Great job tracking your moods! Consistency helps build self-awareness and emotional intelligence."
                  : "Start by tracking your first mood today! Regular tracking helps you understand patterns and improve mental wellness."
                }
              </p>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'overview', name: 'Overview', icon: '👤' },
                    { id: 'goals', name: 'Wellness Goals', icon: '🎯' },
                    { id: 'stats', name: 'Statistics', icon: '📊' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-center border-b-2 font-medium text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">👤</span>
                        </div>
                        <span>Personal Information</span>
                      </h3>
                      {editMode ? (
                        <div className="space-y-6 bg-gray-50 rounded-2xl p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                First Name
                              </label>
                              <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your first name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Last Name
                              </label>
                              <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Enter your last name"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 border border-gray-200">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500">Username</label>
                            <p className="text-lg text-gray-800 font-medium">{user?.username}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500">Email</label>
                            <p className="text-lg text-gray-800 font-medium">{user?.email}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500">First Name</label>
                            <p className="text-lg text-gray-800 font-medium">{user?.profile?.firstName || 'Not set'}</p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-500">Last Name</label>
                            <p className="text-lg text-gray-800 font-medium">{user?.profile?.lastName || 'Not set'}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {editMode && (
                      <div className="flex justify-end space-x-4 pt-6">
                        <button
                          onClick={() => setEditMode(false)}
                          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'goals' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🎯</span>
                      </div>
                      <span>Wellness Goals</span>
                    </h3>

                    {editMode ? (
                      <div className="space-y-6 bg-gray-50 rounded-2xl p-6">
                        <div className="flex space-x-4">
                          <input
                            type="text"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            placeholder="Add a new wellness goal..."
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          />
                          <button
                            onClick={addGoal}
                            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg"
                          >
                            Add Goal
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {formData.goals.map((goal, index) => (
                            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <span className="text-green-600 text-sm">✓</span>
                                </div>
                                <span className="text-gray-800 font-medium">{goal}</span>
                              </div>
                              <button
                                onClick={() => removeGoal(goal)}
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                              >
                                🗑️
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {user?.profile?.goals?.length > 0 ? (
                          user.profile.goals.map((goal, index) => (
                            <div key={index} className="flex items-center space-x-4 bg-white p-6 rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-300">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg">✓</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 text-lg">{goal}</h4>
                                <p className="text-green-600 text-sm">Active goal</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <div className="text-6xl mb-4">🎯</div>
                            <h4 className="text-xl font-semibold text-gray-600 mb-2">No goals set yet</h4>
                            <p className="text-gray-500">Start by adding some wellness goals to track your progress!</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">📊</span>
                      </div>
                      <span>Your Statistics</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center shadow-lg">
                        <div className="text-3xl font-bold mb-2">{user?.stats?.moodEntries || 0}</div>
                        <div className="text-blue-100">Mood Entries</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl text-center shadow-lg">
                        <div className="text-3xl font-bold mb-2">{user?.stats?.journalEntries || 0}</div>
                        <div className="text-green-100">Journal Entries</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl text-center shadow-lg">
                        <div className="text-3xl font-bold mb-2">{user?.stats?.meditationSessions || 0}</div>
                        <div className="text-purple-100">Meditation Sessions</div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Mood Tracking</span>
                            <span>{user?.stats?.moodEntries || 0} entries</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min((user?.stats?.moodEntries || 0) * 10, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Journaling</span>
                            <span>{user?.stats?.journalEntries || 0} entries</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min((user?.stats?.journalEntries || 0) * 20, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Meditation</span>
                            <span>{user?.stats?.meditationSessions || 0} sessions</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                              style={{ width: `${Math.min((user?.stats?.meditationSessions || 0) * 25, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;