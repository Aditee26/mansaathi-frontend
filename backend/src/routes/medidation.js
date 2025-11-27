// backend/src/routes/meditation.js
const express = require('express');
const { getSessions, startSession, completeSession, getMeditationStats } = require('../controllers/meditationController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/sessions', auth, getSessions);
router.post('/sessions/start', auth, startSession);
router.post('/sessions/:id/complete', auth, completeSession);
router.get('/stats', auth, getMeditationStats);

module.exports = router;