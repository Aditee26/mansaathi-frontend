// backend/src/controllers/meditationController.js
const MeditationSession = require('../models/MeditationSession');

exports.getSessions = async (req, res) => {
  try {
    const sessions = await MeditationSession.find({ userId: req.user._id })
      .sort({ startTime: -1 })
      .limit(50);

    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.startSession = async (req, res) => {
  try {
    const { type, duration, guide } = req.body;

    const session = new MeditationSession({
      userId: req.user._id,
      type: type || 'mindfulness',
      plannedDuration: duration || 600, // 10 minutes default
      guide: guide || 'none',
      startTime: new Date()
    });

    await session.save();

    res.status(201).json({
      message: 'Meditation session started',
      session
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.completeSession = async (req, res) => {
  try {
    const { actualDuration, notes, feeling } = req.body;

    const session = await MeditationSession.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        actualDuration,
        notes,
        feeling,
        endTime: new Date(),
        completed: true
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({
      message: 'Meditation session completed',
      session
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMeditationStats = async (req, res) => {
  try {
    const stats = await MeditationSession.aggregate([
      {
        $match: {
          userId: req.user._id,
          completed: true
        }
      },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMinutes: { $sum: { $divide: ['$actualDuration', 60] } },
          avgDuration: { $avg: '$actualDuration' }
        }
      }
    ]);

    const weeklyStats = await MeditationSession.aggregate([
      {
        $match: {
          userId: req.user._id,
          completed: true,
          endTime: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$endTime' },
          sessions: { $sum: 1 },
          minutes: { $sum: { $divide: ['$actualDuration', 60] } }
        }
      }
    ]);

    res.json({
      overall: stats[0] || { totalSessions: 0, totalMinutes: 0, avgDuration: 0 },
      weekly: weeklyStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};