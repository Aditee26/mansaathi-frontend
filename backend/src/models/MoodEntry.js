const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['excited', 'happy', 'calm', 'content', 'tired', 'anxious', 'sad', 'angry', 'stressed']
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  factors: [{
    type: String,
    enum: ['sleep', 'work', 'social', 'exercise', 'food', 'weather', 'family', 'health']
  }],
  notes: String,
  tags: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

moodEntrySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);