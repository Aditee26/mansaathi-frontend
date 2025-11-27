// backend/src/routes/mood.js
const express = require('express');
const { logMood, getMoodHistory, getMoodAnalytics } = require('../controllers/moodController');
const auth = require('../middleware/auth');
const { moodValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/log', auth, moodValidation, logMood);
router.get('/history', auth, getMoodHistory);
router.get('/analytics', auth, getMoodAnalytics);

module.exports = router;