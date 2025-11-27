// backend/src/routes/auth.js
const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { registerValidation } = require('../middleware/validation');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;