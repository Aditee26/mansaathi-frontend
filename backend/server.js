// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin:[
  'https://effervescent-flan-0d168f.netlify.app',
  'http://localhost:3000',
  ],
  credentials: true
}));

app.use(express.json());

// User storage file
const USERS_FILE = path.join(__dirname, 'users.json');

// Load users from file
const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  return [];
};

// Save users to file
const saveUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

let users = loadUsers();

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!', 
    timestamp: new Date(),
    usersCount: users.length
  });
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Register request:', req.body);
    
    const { username, email, password, firstName, lastName } = req.body;
    
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Username, email, and password are required' 
      });
    }
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ 
        message: 'User already exists with this email' 
      });
    }

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ 
        message: 'Username already taken' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      profile: { 
        firstName: firstName || '',
        lastName: lastName || '',
        goals: []
      },
      createdAt: new Date(),
      moodEntries: [],
      journalEntries: [],
      meditationSessions: []
    };
    
    users.push(user);
    saveUsers(users);
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request:', req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Profile endpoint
app.get('/api/auth/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.json({ 
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        createdAt: user.createdAt,
        stats: {
          moodEntries: user.moodEntries?.length || 0,
          journalEntries: user.journalEntries?.length || 0,
          meditationSessions: user.meditationSessions?.length || 0
        }
      }
    });
    
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update profile endpoint
app.put('/api/auth/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const userIndex = users.findIndex(u => u.id === decoded.userId);
    
    if (userIndex === -1) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    const { firstName, lastName, goals } = req.body;
    
    // Update user profile
    users[userIndex].profile = {
      firstName: firstName || users[userIndex].profile.firstName,
      lastName: lastName || users[userIndex].profile.lastName,
      goals: goals || users[userIndex].profile.goals
    };
    
    saveUsers(users);
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: users[userIndex].id,
        username: users[userIndex].username,
        email: users[userIndex].email,
        profile: users[userIndex].profile,
        createdAt: users[userIndex].createdAt
      }
    });
    
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mood endpoints
app.post('/api/mood/log', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const userIndex = users.findIndex(u => u.id === decoded.userId);
    
    if (userIndex === -1) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    const moodEntry = {
      id: Date.now().toString(),
      ...req.body,
      timestamp: new Date()
    };
    
    if (!users[userIndex].moodEntries) {
      users[userIndex].moodEntries = [];
    }
    
    users[userIndex].moodEntries.unshift(moodEntry);
    saveUsers(users);
    
    res.json({
      message: 'Mood logged successfully',
      entry: moodEntry
    });
    
  } catch (error) {
    console.error('Mood log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/mood/history', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    res.json({
      entries: user.moodEntries || []
    });
    
  } catch (error) {
    console.error('Mood history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Test backend: http://localhost:${PORT}/api/test`);
  console.log(`📊 Registered users: ${users.length}`);
});
module.exports = app;