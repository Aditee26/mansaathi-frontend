// backend/src/models/JournalEntry.js
const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  mood: {
    type: String,
    enum: ['excited', 'happy', 'calm', 'content', 'tired', 'anxious', 'sad', 'angry', 'stressed', null],
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  wordCount: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate word count before saving
journalEntrySchema.pre('save', function(next) {
  this.wordCount = this.content.split(/\s+/).filter(word => word.length > 0).length;
  this.updatedAt = Date.now();
  next();
});

journalEntrySchema.index({ userId: 1, timestamp: -1 });
journalEntrySchema.index({ userId: 1, tags: 1 });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);