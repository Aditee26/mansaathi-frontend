// frontend/src/components/dashboard/Journal.jsx
import React, { useState } from 'react';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    setEntries([newEntry, ...entries]);
    setFormData({ title: '', content: '', mood: '', tags: '' });
    setShowForm(false);
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      happy: '😊',
      excited: '😄',
      calm: '😌',
      content: '😐',
      tired: '😴',
      anxious: '😰',
      sad: '😢',
      angry: '😠',
      stressed: '😫'
    };
    return moodEmojis[mood] || '📝';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Personal Journal</h1>
          <p className="text-xl text-gray-600">Express your thoughts, feelings, and reflections</p>
        </div>

        {/* New Entry Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {showForm ? '✕ Cancel' : '📝 Write New Entry'}
          </button>
        </div>

        {/* Journal Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">New Journal Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Thoughts</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows="6"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Express your feelings, thoughts, and reflections..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Mood</label>
                  <select
                    value={formData.mood}
                    onChange={(e) => setFormData({...formData, mood: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select your mood</option>
                    <option value="happy">😊 Happy</option>
                    <option value="excited">😄 Excited</option>
                    <option value="calm">😌 Calm</option>
                    <option value="content">😐 Content</option>
                    <option value="tired">😴 Tired</option>
                    <option value="anxious">😰 Anxious</option>
                    <option value="sad">😢 Sad</option>
                    <option value="angry">😠 Angry</option>
                    <option value="stressed">😫 Stressed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="work, family, goals, gratitude"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg"
              >
                Save Entry
              </button>
            </form>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="text-6xl mb-4">📔</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No journal entries yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Start writing to reflect on your thoughts and feelings. Journaling can help improve self-awareness and emotional wellbeing.
              </p>
            </div>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:border-green-300 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{entry.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{entry.date}</span>
                      <span>•</span>
                      <span>{entry.time}</span>
                    </div>
                  </div>
                  {entry.mood && (
                    <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                      <span className="text-sm font-medium text-gray-700 capitalize">{entry.mood}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">{entry.content}</p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;