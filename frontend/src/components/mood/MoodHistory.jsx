// C:\Users\Aditee Singh\OneDrive\Desktop\mansaathi\frontend\src\components\mood\MoodHistory.jsx
import React, { useState, useEffect } from 'react';
import { moodAPI } from '../../services/api';
import { MOOD_EMOJIS, MOOD_COLORS } from '../../utils/constants';

const MoodHistory = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7'); // 7 days default
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadMoodHistory();
  }, [timeRange]);

  const loadMoodHistory = async () => {
    try {
      setLoading(true);
      const [historyResponse, analyticsResponse] = await Promise.all([
        moodAPI.getHistory(timeRange),
        moodAPI.getAnalytics(timeRange)
      ]);

      setMoodEntries(historyResponse.data.entries);
      setStats(analyticsResponse.data);
    } catch (error) {
      console.error('Error loading mood history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodColor = (mood) => {
    return MOOD_COLORS[mood] || MOOD_COLORS.default;
  };

  const getAverageMood = () => {
    if (!stats?.moodDistribution.length) return null;
    
    const moodScores = {
      'excited': 10,
      'happy': 8,
      'calm': 7,
      'content': 6,
      'tired': 4,
      'anxious': 3,
      'sad': 2,
      'angry': 1,
      'stressed': 2
    };

    let totalScore = 0;
    let totalEntries = 0;

    stats.moodDistribution.forEach(item => {
      totalScore += moodScores[item.mood] * item.count;
      totalEntries += item.count;
    });

    return totalEntries > 0 ? (totalScore / totalEntries).toFixed(1) : null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-history bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Mood History</h2>
        
        {/* Time Range Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalEntries}</div>
            <div className="text-blue-800 text-sm">Total Entries</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {getAverageMood() || '0'}/10
            </div>
            <div className="text-green-800 text-sm">Average Mood</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {stats.moodDistribution.length}
            </div>
            <div className="text-purple-800 text-sm">Different Moods</div>
          </div>
        </div>
      )}

      {/* Mood Entries */}
      <div className="space-y-4">
        {moodEntries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">😊</div>
            <p className="text-gray-500 text-lg">No mood entries yet</p>
            <p className="text-gray-400">Start tracking your mood to see your history here.</p>
          </div>
        ) : (
          moodEntries.map(entry => (
            <div
              key={entry._id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {/* Mood Emoji */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    getMoodColor(entry.mood)
                  }`}
                >
                  {MOOD_EMOJIS[entry.mood]}
                </div>

                {/* Mood Details */}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800 capitalize">
                      {entry.mood}
                    </span>
                    <span className="text-sm text-gray-500">
                      • Intensity: {entry.intensity}/10
                    </span>
                  </div>
                  
                  {entry.notes && (
                    <p className="text-gray-600 text-sm mt-1">{entry.notes}</p>
                  )}
                  
                  {entry.factors && entry.factors.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.factors.map(factor => (
                        <span
                          key={factor}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-1">
                    {formatDate(entry.timestamp)}
                  </div>
                </div>
              </div>

              {/* Intensity Bar */}
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(entry.intensity / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-6 text-right">
                  {entry.intensity}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mood Distribution Chart (Simple) */}
      {stats?.moodDistribution && stats.moodDistribution.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mood Distribution</h3>
          <div className="space-y-2">
            {stats.moodDistribution
              .sort((a, b) => b.count - a.count)
              .map(item => (
                <div key={item.mood} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-32">
                    <span className="text-xl">{MOOD_EMOJIS[item.mood]}</span>
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {item.mood}
                    </span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getMoodColor(item.mood)}`}
                        style={{
                          width: `${(item.count / stats.totalEntries) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 w-12 text-right">
                    {item.count} ({Math.round((item.count / stats.totalEntries) * 100)}%)
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodHistory;