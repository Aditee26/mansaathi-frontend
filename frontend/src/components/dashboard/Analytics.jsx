// frontend/src/components/dashboard/Analytics.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const Analytics = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const analyticsData = {
    moodEntries: user?.stats?.moodEntries || 0,
    journalEntries: user?.stats?.journalEntries || 0,
    meditationSessions: user?.stats?.meditationSessions || 0,
    currentStreak: Math.min(user?.stats?.moodEntries || 0, 7),
    averageMood: user?.stats?.moodEntries > 0 ? '7.2/10' : '-',
    mostCommonMood: user?.stats?.moodEntries > 0 ? 'Calm' : '-'
  };

  const weeklyProgress = [
    { day: 'Mon', mood: 7, journal: true, meditation: true },
    { day: 'Tue', mood: 8, journal: true, meditation: false },
    { day: 'Wed', mood: 6, journal: false, meditation: true },
    { day: 'Thu', mood: 9, journal: true, meditation: true },
    { day: 'Fri', mood: 7, journal: true, meditation: false },
    { day: 'Sat', mood: 8, journal: false, meditation: true },
    { day: 'Sun', mood: 7, journal: true, meditation: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Wellness Analytics</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your mental health journey and discover patterns in your wellbeing
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">{analyticsData.moodEntries}</div>
            <div className="text-blue-800 font-semibold">Mood Entries</div>
            <div className="text-blue-600 text-sm mt-1">Tracked</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">{analyticsData.currentStreak}</div>
            <div className="text-green-800 font-semibold">Day Streak</div>
            <div className="text-green-600 text-sm mt-1">Current</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">{analyticsData.averageMood}</div>
            <div className="text-purple-800 font-semibold">Avg Mood</div>
            <div className="text-purple-600 text-sm mt-1">This Week</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-orange-200">
            <div className="text-3xl font-bold text-orange-600 mb-2 capitalize">{analyticsData.mostCommonMood}</div>
            <div className="text-orange-800 font-semibold">Common Mood</div>
            <div className="text-orange-600 text-sm mt-1">Most Frequent</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <span className="text-2xl">📅</span>
              <span>Weekly Progress</span>
            </h3>
            
            <div className="space-y-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600">{day.day}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Mood: {day.mood}/10</div>
                      <div className="flex space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${day.journal ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                          📔 Journal
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${day.meditation ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-500'}`}>
                          🧘 Meditation
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${day.mood * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Distribution */}
          <div className="space-y-8">
            {/* Activity Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <span>Activity Distribution</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Mood Tracking</span>
                    <span>{analyticsData.moodEntries} entries</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(analyticsData.moodEntries * 20, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Journaling</span>
                    <span>{analyticsData.journalEntries} entries</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(analyticsData.journalEntries * 25, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Meditation</span>
                    <span>{analyticsData.meditationSessions} sessions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(analyticsData.meditationSessions * 33, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
                <span className="text-2xl">💡</span>
                <span>Personal Insights</span>
              </h3>
              
              <div className="space-y-4 text-gray-700">
                {analyticsData.moodEntries > 0 ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-500 text-lg">✓</span>
                      <p>You've been consistent with tracking your mood {analyticsData.currentStreak} days in a row!</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-500 text-lg">✓</span>
                      <p>Your average mood of {analyticsData.averageMood} shows good emotional balance.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-purple-500 text-lg">💪</span>
                      <p>Keep up the great work! Consistency is key to understanding your patterns.</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-6xl mb-4">📈</div>
                    <h4 className="text-xl font-semibold text-gray-600 mb-2">Start Tracking to See Insights</h4>
                    <p className="text-gray-500">Your analytics will appear here once you start using the app features!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <span>Recommendations</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-blue-500 text-lg">1</span>
                  <p className="text-gray-700">Try to log your mood at the same time each day</p>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-green-500 text-lg">2</span>
                  <p className="text-gray-700">Practice breathing exercises when feeling stressed</p>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                  <span className="text-purple-500 text-lg">3</span>
                  <p className="text-gray-700">Write in your journal before bed for better sleep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;