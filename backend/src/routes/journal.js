// backend/src/routes/journal.js
const express = require('express');
const { createEntry, getEntries, getEntry, updateEntry, deleteEntry } = require('../controllers/journalController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/entries', auth, createEntry);
router.get('/entries', auth, getEntries);
router.get('/entries/:id', auth, getEntry);
router.put('/entries/:id', auth, updateEntry);
router.delete('/entries/:id', auth, deleteEntry);

module.exports = router;