// frontend/src/components/mood/MoodWheel.jsx
import React, { useState } from 'react';

const moodData = [
  { 
    emoji: '😊', 
    label: 'Happy', 
    value: 'happy',
    color: 'bg-gradient-to-br from-yellow-400 to-orange-400',
    description: 'Feeling good and positive'
  },
  { 
    emoji: '😄', 
    label: 'Excited', 
    value: 'excited',
    color: 'bg-gradient-to-br from-pink-500 to-red-500',
    description: 'Full of energy and anticipation'
  },
  { 
    emoji: '😌', 
    label: 'Calm', 
    value: 'calm',
    color: 'bg-gradient-to-br from-blue-400 to-cyan-400',
    description: 'Peaceful and relaxed'
  },
  { 
    emoji: '😐', 
    label: 'Content', 
    value: 'content',
    color: 'bg-gradient-to-br from-green-400 to-emerald-400',
    description: 'Satisfied and at ease'
  },
  { 
    emoji: '😴', 
    label: 'Tired', 
    value: 'tired',
    color: 'bg-gradient-to-br from-gray-400 to-gray-600',
    description: 'Low on energy, needing rest'
  },
  { 
    emoji: '😰', 
    label: 'Anxious', 
    value: 'anxious',
    color: 'bg-gradient-to-br from-purple-400 to-indigo-400',
    description: 'Worried or nervous'
  },
  { 
    emoji: '😢', 
    label: 'Sad', 
    value: 'sad',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    description: 'Feeling down or upset'
  },
  { 
    emoji: '😠', 
    label: 'Angry', 
    value: 'angry',
    color: 'bg-gradient-to-br from-red-500 to-orange-500',
    description: 'Frustrated or irritated'
  },
  { 
    emoji: '😫', 
    label: 'Stressed', 
    value: 'stressed',
    color: 'bg-gradient-to-br from-red-600 to-pink-600',
    description: 'Under pressure or overwhelmed'
  }
];

const MoodWheel = ({ onMoodSelect, selectedMood }) => {
  const [hoveredMood, setHoveredMood] = useState(null);

  const handleMoodClick = (mood) => {
    onMoodSelect(mood.value);
  };

  const getMoodPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const radius = 120;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  return (
    <div className="mood-wheel-container p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
        How are you feeling?
      </h3>
      
      {/* Mood Description */}
      {hoveredMood && (
        <div className="text-center mb-4 p-3 bg-blue-50 rounded-lg transition-all duration-300">
          <p className="text-blue-800 font-medium">
            {hoveredMood.emoji} {hoveredMood.label}
          </p>
          <p className="text-blue-600 text-sm">{hoveredMood.description}</p>
        </div>
      )}

      {/* Wheel Container */}
      <div className="relative flex justify-center items-center">
        <div className="relative w-80 h-80">
          {/* Central Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-inner flex items-center justify-center border-2 border-gray-300">
              {selectedMood ? (
                <div className="text-center">
                  <span className="text-3xl block">
                    {moodData.find(m => m.value === selectedMood)?.emoji}
                  </span>
                  <span className="text-xs text-gray-600 font-medium block mt-1">
                    Selected
                  </span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm text-center px-2">
                  Choose a mood
                </span>
              )}
            </div>
          </div>

          {/* Mood Items */}
          {moodData.map((mood, index) => {
            const position = getMoodPosition(index, moodData.length);
            const isSelected = selectedMood === mood.value;
            const isHovered = hoveredMood?.value === mood.value;

            return (
              <button
                key={mood.value}
                className={`absolute w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                  isSelected 
                    ? `${mood.color} scale-110 shadow-lg text-white` 
                    : 'bg-white hover:scale-105 shadow-md text-gray-800'
                } ${
                  isHovered && !isSelected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                } border-2 ${isSelected ? 'border-white' : 'border-gray-200'}`}
                style={{
                  left: `calc(50% + ${position.x}px - 2rem)`,
                  top: `calc(50% + ${position.y}px - 2rem)`,
                  transform: `translate(${isSelected ? '0, 0 scale(1.1)' : '0, 0'})`
                }}
                onClick={() => handleMoodClick(mood)}
                onMouseEnter={() => setHoveredMood(mood)}
                onMouseLeave={() => setHoveredMood(null)}
                title={`${mood.label}: ${mood.description}`}
              >
                <span className="text-2xl transition-transform duration-300">
                  {mood.emoji}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Mood Info */}
      {selectedMood && (
        <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-3xl">
              {moodData.find(m => m.value === selectedMood)?.emoji}
            </span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 text-lg capitalize">
                {moodData.find(m => m.value === selectedMood)?.label}
              </h4>
              <p className="text-gray-600 text-sm">
                {moodData.find(m => m.value === selectedMood)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm">
          Click on a mood to select it. Hover to see descriptions.
        </p>
      </div>
    </div>
  );
};

export default MoodWheel;