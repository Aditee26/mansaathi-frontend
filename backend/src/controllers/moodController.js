// backend/src/controllers/moodController.js
const MoodEntry = require('../models/MoodEntry');
const { validationResult } = require('express-validator');

exports.logMood = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, intensity, factors, notes, tags } = req.body;

    const moodEntry = new MoodEntry({
      userId: req.user._id,
      mood,
      intensity,
      factors: factors || [],
      notes,
      tags: tags || []
    });

    await moodEntry.save();

    res.status(201).json({
      message: 'Mood logged successfully',
      entry: moodEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const entries = await MoodEntry.find({
      userId: req.user._id,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: -1 });

    res.json({ entries });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMoodAnalytics = async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const analytics = await MoodEntry.aggregate([
      {
        $match: {
          userId: req.user._id,
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      {
        $project: {
          mood: '$_id',
          count: 1,
          avgIntensity: { $round: ['$avgIntensity', 2] },
          _id: 0
        }
      }
    ]);

    // Get weekly trends
    const weeklyTrends = await MoodEntry.aggregate([
      {
        $match: {
          userId: req.user._id,
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            week: { $week: '$timestamp' },
            mood: '$mood'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 }
      }
    ]);

    res.json({
      moodDistribution: analytics,
      weeklyTrends,
      totalEntries: analytics.reduce((sum, item) => sum + item.count, 0)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};