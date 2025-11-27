// frontend/src/components/dashboard/MoodTracker.jsx
import React, { useState } from 'react';
import { moodAPI } from '../../services/api.js';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const moodData = [
    { emoji: '😊', label: 'Happy', value: 'happy', color: 'from-yellow-400 to-orange-400', description: 'Feeling joyful and positive' },
    { emoji: '😄', label: 'Excited', value: 'excited', color: 'from-pink-500 to-rose-500', description: 'Full of energy and enthusiasm' },
    { emoji: '😌', label: 'Calm', value: 'calm', color: 'from-blue-400 to-cyan-400', description: 'Peaceful and relaxed' },
    { emoji: '😐', label: 'Content', value: 'content', color: 'from-green-400 to-emerald-400', description: 'Satisfied and comfortable' },
    { emoji: '😴', label: 'Tired', value: 'tired', color: 'from-gray-400 to-gray-600', description: 'Need rest and relaxation' },
    { emoji: '😰', label: 'Anxious', value: 'anxious', color: 'from-purple-400 to-indigo-400', description: 'Feeling worried or nervous' },
    { emoji: '😢', label: 'Sad', value: 'sad', color: 'from-blue-500 to-indigo-500', description: 'Feeling down or upset' },
    { emoji: '😠', label: 'Angry', value: 'angry', color: 'from-red-500 to-orange-500', description: 'Frustrated or irritated' },
    { emoji: '😫', label: 'Stressed', value: 'stressed', color: 'from-red-600 to-pink-600', description: 'Under pressure or overwhelmed' }
  ];

  const factors = [
    { value: 'sleep', label: 'Sleep', emoji: '😴', color: 'from-blue-400 to-cyan-400' },
    { value: 'work', label: 'Work', emoji: '💼', color: 'from-purple-400 to-indigo-400' },
    { value: 'social', label: 'Social', emoji: '👥', color: 'from-green-400 to-emerald-400' },
    { value: 'exercise', label: 'Exercise', emoji: '🏃', color: 'from-orange-400 to-red-400' },
    { value: 'food', label: 'Food', emoji: '🍎', color: 'from-yellow-400 to-orange-400' },
    { value: 'weather', label: 'Weather', emoji: '☀️', color: 'from-cyan-400 to-blue-400' },
    { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', color: 'from-pink-400 to-rose-400' },
    { value: 'health', label: 'Health', emoji: '❤️', color: 'from-red-400 to-pink-400' }
  ];

  const handleFactorToggle = (factor) => {
    setSelectedFactors(prev =>
      prev.includes(factor.value)
        ? prev.filter(f => f !== factor.value)
        : [...prev, factor.value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMood) {
      setMessage('Please select a mood first!');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    
    try {
      await moodAPI.logMood({
        mood: selectedMood,
        intensity,
        factors: selectedFactors,
        notes
      });
      
      // Reset form
      setSelectedMood('');
      setIntensity(5);
      setSelectedFactors([]);
      setNotes('');
      setMessage('🎉 Mood logged successfully! Your emotional awareness is growing.');
      
      // Clear success message after 4 seconds
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      console.error('Error logging mood:', error);
      setMessage('❌ Error logging mood. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedMoodData = () => {
    return moodData.find(mood => mood.value === selectedMood);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl shadow-2xl mb-6">
          <span className="text-4xl">😊</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          How are you feeling?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Take a moment to check in with yourself. Your emotions matter.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className={`max-w-2xl mx-auto mb-8 p-6 rounded-2xl text-center font-semibold text-lg shadow-xl transform transition-all duration-500 ${
          message.includes('🎉') 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
            : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
        }`}>
          {message}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Mood Selection */}
        <div className="lg:col-span-2 space-y-8">
          {/* Mood Grid */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <span className="text-3xl">🎭</span>
              <span>Select Your Current Mood</span>
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {moodData.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${
                    selectedMood === mood.value
                      ? `border-transparent bg-gradient-to-r ${mood.color} scale-105 shadow-2xl`
                      : 'border-gray-200 bg-white/80 hover:border-gray-300 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className={`text-center transition-all duration-300 ${
                    selectedMood === mood.value ? 'text-white' : 'text-gray-700'
                  }`}>
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {mood.emoji}
                    </div>
                    <div className="font-semibold text-lg">{mood.label}</div>
                    <div className="text-sm opacity-90 mt-1">{mood.description}</div>
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedMood === mood.value && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Intensity Slider */}
          {selectedMood && (
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <span className="text-3xl">📊</span>
                <span>How intense is this feeling?</span>
              </h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {intensity}/10
                  </div>
                  <div className="text-gray-600 text-lg">
                    {intensity <= 3 && 'Very Mild'}
                    {intensity > 3 && intensity <= 5 && 'Moderate'}
                    {intensity > 5 && intensity <= 7 && 'Strong'}
                    {intensity > 7 && intensity <= 9 && 'Very Strong'}
                    {intensity === 10 && 'Extreme'}
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full -translate-y-1/2 pointer-events-none">
                    <div 
                      className="absolute top-0 left-0 h-2 bg-gray-200 rounded-full"
                      style={{ width: `${(intensity / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 px-2">
                  <span>Very Mild</span>
                  <span>Extreme</span>
                </div>
              </div>
            </div>
          )}

          {/* Factors */}
          {selectedMood && (
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <span className="text-3xl">🌿</span>
                <span>What's influencing your mood?</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {factors.map(factor => (
                  <button
                    key={factor.value}
                    type="button"
                    onClick={() => handleFactorToggle(factor)}
                    className={`group p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedFactors.includes(factor.value)
                        ? `border-transparent bg-gradient-to-r ${factor.color} text-white shadow-2xl`
                        : 'border-gray-200 bg-white/80 hover:border-gray-300 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                        {factor.emoji}
                      </div>
                      <div className="font-semibold">{factor.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {selectedMood && (
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <span className="text-3xl">📝</span>
                <span>Additional thoughts (optional)</span>
              </h3>
              
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's on your mind? Any specific thoughts, triggers, or things you're grateful for today?"
                rows="4"
                className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 bg-white/50 resize-none shadow-inner"
              />
              
              <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                <span>Your thoughts are safe here</span>
                <span>{notes.length}/500 characters</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {selectedMood && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-blue-200">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-8 rounded-2xl text-xl font-bold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging Your Mood...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-2xl">✨</span>
                    <span>Log My Mood & Continue Growing</span>
                  </div>
                )}
              </button>
              
              <p className="text-center text-blue-700 text-sm mt-4 font-medium">
                Every mood you track helps you understand yourself better. You're doing amazing! 🌟
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Selected Mood Preview & Stats */}
        <div className="space-y-8">
          {/* Selected Mood Preview */}
          {selectedMood && (
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 text-white shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                  {getSelectedMoodData()?.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-2">{getSelectedMoodData()?.label}</h3>
                <p className="text-pink-100 text-lg">{getSelectedMoodData()?.description}</p>
                
                <div className="mt-6 bg-white/20 rounded-2xl p-4">
                  <div className="text-3xl font-bold mb-1">{intensity}/10</div>
                  <div className="text-pink-200">Intensity Level</div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <span className="text-2xl">📈</span>
              <span>Your Mood Journey</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-lg">📅</span>
                  </div>
                  <span className="text-gray-700 font-semibold">Current Streak</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">0 days</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-lg">😊</span>
                  </div>
                  <span className="text-gray-700 font-semibold">Total Entries</span>
                </div>
                <span className="text-2xl font-bold text-green-600">0</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-lg">🌟</span>
                  </div>
                  <span className="text-gray-700 font-semibold">Most Common</span>
                </div>
                <span className="text-xl font-bold text-purple-600">-</span>
              </div>
            </div>
          </div>

          {/* Wellness Tip */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 shadow-2xl border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <span className="text-2xl">💡</span>
              <span>Wellness Tip</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {selectedMood 
                ? "Remember: All emotions are valid and temporary. Acknowledging how you feel is the first step toward emotional wellness."
                : "Regular mood tracking can help you identify patterns and triggers, leading to better emotional awareness and coping strategies."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;