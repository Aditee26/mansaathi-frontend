// backend/src/models/MeditationSession.js
const mongoose = require('mongoose');

const meditationSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['mindfulness', 'loving-kindness', 'body-scan', 'breathing', 'guided', 'transcendental'],
    default: 'mindfulness'
  },
  plannedDuration: {
    type: Number, // in seconds
    required: true
  },
  actualDuration: {
    type: Number, // in seconds
    default: 0
  },
  guide: {
    type: String,
    default: 'none'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  feeling: {
    type: String,
    enum: ['relaxed', 'focused', 'calm', 'energized', 'sleepy', 'distracted', 'anxious', null],
    default: null
  },
  notes: {
    type: String,
    maxlength: 500
  }
});

meditationSessionSchema.virtual('efficiency').get(function() {
  if (!this.completed || !this.actualDuration) return 0;
  return Math.min(100, Math.round((this.actualDuration / this.plannedDuration) * 100));
});

meditationSessionSchema.set('toJSON', { virtuals: true });

meditationSessionSchema.index({ userId: 1, startTime: -1 });

module.exports = mongoose.model('MeditationSession', meditationSessionSchema);