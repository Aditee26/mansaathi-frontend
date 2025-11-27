// backend/src/middleware/validation.js
const { body } = require('express-validator');

exports.registerValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

exports.moodValidation = [
  body('mood')
    .isIn(['excited', 'happy', 'calm', 'content', 'tired', 'anxious', 'sad', 'angry', 'stressed'])
    .withMessage('Please select a valid mood'),
  
  body('intensity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Intensity must be between 1 and 10'),
];