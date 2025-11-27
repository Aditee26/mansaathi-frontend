// frontend/src/components/dashboard/MeditationPlayer.jsx
import React, { useState, useEffect } from 'react';

const MeditationPlayer = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isPlaying, setIsPlaying] = useState(false);

  const meditationTypes = [
    { id: 'mindfulness', name: 'Mindfulness', duration: 300, description: 'Focus on the present moment' },
    { id: 'breathing', name: 'Breathing', duration: 180, description: 'Follow your breath' },
    { id: 'body-scan', name: 'Body Scan', duration: 600, description: 'Scan through your body' },
    { id: 'loving-kindness', name: 'Loving Kindness', duration: 300, description: 'Cultivate compassion' }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      completeSession();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const startSession = (type) => {
    setActiveSession(type);
    setTimeLeft(type.duration);
    setIsPlaying(true);
  };

  const completeSession = () => {
    const newSession = {
      id: Date.now(),
      type: activeSession.name,
      duration: activeSession.duration,
      completedAt: new Date().toLocaleString()
    };
    setSessions([newSession, ...sessions.slice(0, 4)]);
    setIsPlaying(false);
    setActiveSession(null);
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Meditation</h2>
        <p className="text-gray-600 mb-6">Find your center with guided mindfulness practices.</p>

        {!activeSession ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meditationTypes.map(type => (
              <div
                key={type.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-100 cursor-pointer hover:border-blue-300 transition-all"
                onClick={() => startSession(type)}
              >
                <div className="text-3xl mb-3">🧘</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{type.name}</h3>
                <p className="text-gray-600 mb-3">{type.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{formatTime(type.duration)}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg">
            <div className="text-6xl mb-4">🧘‍♀️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{activeSession.name}</h3>
            <p className="text-gray-600 mb-6">{activeSession.description}</p>
            
            <div className="text-6xl font-light text-blue-600 mb-6">
              {formatTime(timeLeft)}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700"
              >
                {isPlaying ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={completeSession}
                className="bg-gray-600 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-700"
              >
                End Session
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No meditation sessions yet.</p>
        ) : (
          <div className="space-y-3">
            {sessions.map(session => (
              <div key={session.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-800">{session.type}</h4>
                  <p className="text-sm text-gray-600">{session.completedAt}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {formatTime(session.duration)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationPlayer;