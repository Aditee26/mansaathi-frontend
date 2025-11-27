// frontend/src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Header from '../components/common/Header.jsx';

// Import all components
import MoodTracker from '../components/dashboard/MoodTracker.jsx';
import Journal from '../components/dashboard/Journal.jsx';
import MeditationPlayer from '../components/dashboard/MeditationPlayer.jsx';
import Analytics from '../components/dashboard/Analytics.jsx';
import BreathingExercises from '../components/dashboard/BreathingExercises.jsx';
import AIChatbot from '../components/dashboard/AIChatbot.jsx';
import CrisisResources from '../components/dashboard/CrisisResources.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('mood');

  const tabs = [
    { 
      id: 'mood', 
      name: 'Mood Tracker', 
      icon: '😊', 
      description: 'Track your daily emotions',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    { 
      id: 'journal', 
      name: 'Journal', 
      icon: '📔', 
      description: 'Write your thoughts and reflections',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    { 
      id: 'meditation', 
      name: 'Meditation', 
      icon: '🧘', 
      description: 'Practice mindfulness and calm',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    { 
      id: 'breathing', 
      name: 'Breathing', 
      icon: '🌬️', 
      description: 'Calming breathing exercises',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    { 
      id: 'chatbot', 
      name: 'AI Assistant', 
      icon: '🤖', 
      description: 'Talk with mental health assistant',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
    { 
      id: 'crisis', 
      name: 'Crisis Help', 
      icon: '🆘', 
      description: 'Emergency resources and support',
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50'
    },
    { 
      id: 'analytics', 
      name: 'Analytics', 
      icon: '📊', 
      description: 'View your progress and insights',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'meditation':
        return <MeditationPlayer />;
      case 'breathing':
        return <BreathingExercises />;
      case 'chatbot':
        return <AIChatbot />;
      case 'crisis':
        return <CrisisResources />;
      case 'analytics':
        return <Analytics />;
      default:
        return <MoodTracker />;
    }
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the common Header component */}
      <Header />
      
      {/* Main Dashboard Content */}
      <div className={`min-h-screen bg-gradient-to-br ${currentTab?.bgGradient || 'from-blue-50 to-purple-50'} transition-all duration-500 pt-16`}>
        
        {/* Animated Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <nav className="flex space-x-1 p-4 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-500 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl scale-105`
                      : 'text-gray-600 bg-white/80 hover:bg-white hover:text-gray-900 shadow-sm'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="whitespace-nowrap">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Tab Header with Animation */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-lg rounded-2xl px-8 py-6 shadow-2xl border border-white/20">
              <div className={`w-16 h-16 bg-gradient-to-r ${currentTab?.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                {currentTab?.icon}
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {currentTab?.name}
                </h1>
                <p className="text-gray-600 text-lg mt-1">{currentTab?.description}</p>
              </div>
            </div>
          </div>

          {/* Content Container with Glass Effect */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {renderContent()}
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-600 mb-2">{user?.stats?.moodEntries || 0}</div>
              <div className="text-gray-600 font-medium">Mood Entries</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl border border-white/20">
              <div className="text-2xl font-bold text-green-600 mb-2">{user?.stats?.journalEntries || 0}</div>
              <div className="text-gray-600 font-medium">Journal Entries</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl border border-white/20">
              <div className="text-2xl font-bold text-purple-600 mb-2">{user?.stats?.meditationSessions || 0}</div>
              <div className="text-gray-600 font-medium">Meditation Sessions</div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl border border-white/20">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {user?.createdAt ? Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) : 0}
              </div>
              <div className="text-gray-600 font-medium">Days with Mansaathi</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;