// backend/src/controllers/journalController.js
const JournalEntry = require('../models/JournalEntry');

exports.createEntry = async (req, res) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.body;

    const journalEntry = new JournalEntry({
      userId: req.user._id,
      title,
      content,
      mood,
      tags: tags || [],
      isPrivate: isPrivate !== undefined ? isPrivate : true
    });

    await journalEntry.save();

    res.status(201).json({
      message: 'Journal entry created successfully',
      entry: journalEntry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const { page = 1, limit = 10, mood, startDate, endDate } = req.query;
    
    const filter = { userId: req.user._id };
    
    if (mood) filter.mood = mood;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    const entries = await JournalEntry.find(filter)
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await JournalEntry.countDocuments(filter);

    res.json({
      entries,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ entry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.body;

    const entry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content, mood, tags, isPrivate, updatedAt: new Date() },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({
      message: 'Journal entry updated successfully',
      entry
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};