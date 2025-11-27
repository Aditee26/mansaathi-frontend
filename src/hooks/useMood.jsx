// C:/Users/Aditee Singh/OneDrive/Desktop/mansaathi/frontend/src/hooks/useMood.jsx
import { useState, useEffect } from 'react';
import { moodAPI } from '../services/api';

export const useMood = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  const logMood = async (moodData) => {
    try {
      setLoading(true);
      setError('');
      const response = await moodAPI.logMood(moodData);
      
      // Add the new entry to the beginning of the list
      setMoodEntries(prev => [response.data.entry, ...prev]);
      
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to log mood';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoodHistory = async (days = 30) => {
    try {
      setLoading(true);
      setError('');
      const response = await moodAPI.getHistory(days);
      setMoodEntries(response.data.entries);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load mood history';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoodAnalytics = async (days = 30) => {
    try {
      setLoading(true);
      setError('');
      const response = await moodAPI.getAnalytics(days);
      setStats(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load mood analytics';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const getMoodStreak = () => {
    if (moodEntries.length === 0) return 0;

    let streak = 0;
    const today = new Date().toDateString();
    
    // Check if today's mood is logged
    const todayEntry = moodEntries.find(entry => 
      new Date(entry.timestamp).toDateString() === today
    );

    if (!todayEntry) return 0;

    streak = 1; // Today counts as 1

    // Sort entries by date (newest first)
    const sortedEntries = [...moodEntries].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Check consecutive days
    for (let i = 1; i < sortedEntries.length; i++) {
      const currentDate = new Date(sortedEntries[i].timestamp);
      const previousDate = new Date(sortedEntries[i - 1].timestamp);
      
      const diffTime = previousDate - currentDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getRecentMoods = (count = 5) => {
    return moodEntries.slice(0, count);
  };

  const getMoodFrequency = () => {
    const frequency = {};
    moodEntries.forEach(entry => {
      frequency[entry.mood] = (frequency[entry.mood] || 0) + 1;
    });
    return frequency;
  };

  const getAverageIntensity = () => {
    if (moodEntries.length === 0) return 0;
    const total = moodEntries.reduce((sum, entry) => sum + entry.intensity, 0);
    return (total / moodEntries.length).toFixed(1);
  };

  const clearError = () => {
    setError('');
  };

  // Load initial data
  useEffect(() => {
    loadMoodHistory();
    loadMoodAnalytics();
  }, []);

  return {
    moodEntries,
    loading,
    error,
    stats,
    logMood,
    loadMoodHistory,
    loadMoodAnalytics,
    getMoodStreak,
    getRecentMoods,
    getMoodFrequency,
    getAverageIntensity,
    clearError
  };
};

export default useMood;