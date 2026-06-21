// frontend/src/components/dashboard/BreathingExercises.jsx
import React, { useState, useEffect } from 'react';

const BreathingExercises = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('breatheIn');
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const phases = {
    breatheIn: { 
      duration: 4000, 
      text: 'Breathe In', 
      color: 'from-blue-400 to-blue-600', 
      instruction: 'Slowly breathe in through your nose',
      emoji: '🌬️'
    },
    hold: { 
      duration: 4000, 
      text: 'Hold', 
      color: 'from-emerald-400 to-emerald-600', 
      instruction: 'Hold your breath gently',
      emoji: '⏳'
    },
    breatheOut: { 
      duration: 6000, 
      text: 'Breathe Out', 
      color: 'from-purple-400 to-purple-600', 
      instruction: 'Slowly exhale through your mouth',
      emoji: '💨'
    }
  };

  useEffect(() => {
    let timer;
    if (isActive) {
      const currentPhase = phases[phase];
      setTimeLeft(currentPhase.duration / 1000);
      
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (phase === 'breatheIn') setPhase('hold');
            else if (phase === 'hold') setPhase('breatheOut');
            else {
              setPhase('breatheIn');
              setCycle(prev => prev + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Track total meditation time
      const totalTimer = setInterval(() => {
        setTotalTime(prev => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        clearInterval(totalTimer);
      };
    } else {
      setTotalTime(0);
    }
  }, [isActive, phase]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('breatheIn');
    setCycle(0);
    setTotalTime(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const getCircleSize = () => {
    if (!isActive) return 'scale-100';
    if (phase === 'breatheIn') return 'scale-125';
    if (phase === 'breatheOut') return 'scale-75';
    return 'scale-100';
  };

  const getProgressPercentage = () => {
    const currentPhase = phases[phase];
    return ((currentPhase.duration / 1000 - timeLeft) / (currentPhase.duration / 1000)) * 100;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Breathing Exercises</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calm your mind and reduce stress with guided breathing techniques. 
            Perfect for anxiety relief and mindfulness practice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Breathing Exercise */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
              {/* Breathing Animation */}
              <div className="text-center mb-8">
                <div className={`relative mx-auto w-80 h-80 rounded-full flex items-center justify-center transition-all duration-1000 bg-gradient-to-br ${isActive ? phases[phase].color : 'from-gray-200 to-gray-400'} ${getCircleSize()} shadow-2xl`}>
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle
                      cx="160"
                      cy="160"
                      r="150"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="160"
                      cy="160"
                      r="150"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeDasharray={`${getProgressPercentage() * 9.42} 942`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  <div className="text-white text-center z-10">
                    <div className="text-6xl mb-4">{phases[phase].emoji}</div>
                    <div className="text-4xl font-bold mb-2">
                      {isActive ? phases[phase].text : 'Ready to Breathe?'}
                    </div>
                    {isActive && (
                      <>
                        <div className="text-6xl font-light mb-2">{timeLeft}s</div>
                        <div className="text-lg opacity-90 font-medium">{phases[phase].instruction}</div>
                      </>
                    )}
                    <div className="text-sm opacity-80 mt-4">Cycle: {cycle}</div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="text-center space-y-6">
                <div className="flex justify-center space-x-8 text-sm text-gray-600 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">Breathe In</div>
                    <div>4 seconds</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-emerald-600">Hold</div>
                    <div>4 seconds</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">Breathe Out</div>
                    <div>6 seconds</div>
                  </div>
                </div>

                {!isActive ? (
                  <button
                    onClick={startExercise}
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🎵 Start Breathing Exercise
                  </button>
                ) : (
                  <button
                    onClick={stopExercise}
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-8 rounded-2xl text-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    ⏹️ Stop Exercise
                  </button>
                )}

                {isActive && (
                  <div className="text-center text-gray-600">
                    <div className="text-lg font-semibold">Total Time: {formatTime(totalTime)}</div>
                    <div className="text-sm">Keep going! You're doing great.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Benefits and Instructions */}
          <div className="space-y-6">
            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">💚</span>
                <span>Benefits</span>
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Reduces stress & anxiety</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Lowers blood pressure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Improves focus & concentration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Promotes relaxation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Helps with sleep quality</span>
                </li>
              </ul>
            </div>

            {/* Instructions Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">📋</span>
                <span>Instructions</span>
              </h3>
              <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                <li>Sit comfortably with straight back</li>
                <li>Close your eyes if comfortable</li>
                <li>Follow the breathing pattern</li>
                <li>Focus only on your breath</li>
                <li>Continue for 5-10 cycles</li>
                <li>Practice daily for best results</li>
              </ol>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl shadow-lg p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">💡</span>
                <span>Pro Tips</span>
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>Practice in a quiet space without distractions</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>Use this exercise when feeling stressed or before sleep</span>
                </p>
                <p className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>Gradually increase duration as you get comfortable</span>
                </p>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl shadow-lg p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <span>Today's Progress</span>
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{cycle}</div>
                <div className="text-gray-600">Breathing Cycles Completed</div>
                {cycle >= 5 && (
                  <div className="mt-3 text-green-600 font-semibold">
                    🌟 Great job! Keep it up!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercises;