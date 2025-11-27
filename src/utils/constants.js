// C:\Users\Aditee Singh\OneDrive\Desktop\mansaathi\frontend\src\utils\constants.js

// Mood related constants
export const MOOD_EMOJIS = {
  excited: '😄',
  happy: '😊',
  calm: '😌',
  content: '😐',
  tired: '😴',
  anxious: '😰',
  sad: '😢',
  angry: '😠',
  stressed: '😫'
};

export const MOOD_COLORS = {
  excited: 'bg-gradient-to-br from-pink-500 to-red-500 text-white',
  happy: 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white',
  calm: 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white',
  content: 'bg-gradient-to-br from-green-400 to-emerald-400 text-white',
  tired: 'bg-gradient-to-br from-gray-400 to-gray-600 text-white',
  anxious: 'bg-gradient-to-br from-purple-400 to-indigo-400 text-white',
  sad: 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white',
  angry: 'bg-gradient-to-br from-red-500 to-orange-500 text-white',
  stressed: 'bg-gradient-to-br from-red-600 to-pink-600 text-white',
  default: 'bg-gray-200 text-gray-800'
};

export const MOOD_INTENSITY_LABELS = {
  1: 'Very Low',
  2: 'Low',
  3: 'Mild',
  4: 'Moderate',
  5: 'Medium',
  6: 'Moderately High',
  7: 'High',
  8: 'Very High',
  9: 'Extreme',
  10: 'Maximum'
};

export const MOOD_FACTORS = [
  { value: 'sleep', label: 'Sleep', emoji: '😴' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'social', label: 'Social', emoji: '👥' },
  { value: 'exercise', label: 'Exercise', emoji: '🏃' },
  { value: 'food', label: 'Food', emoji: '🍎' },
  { value: 'weather', label: 'Weather', emoji: '☀️' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { value: 'health', label: 'Health', emoji: '❤️' },
  { value: 'relationships', label: 'Relationships', emoji: '💑' },
  { value: 'finances', label: 'Finances', emoji: '💰' },
  { value: 'hobbies', label: 'Hobbies', emoji: '🎨' },
  { value: 'achievements', label: 'Achievements', emoji: '🏆' }
];

// Meditation constants
export const MEDITATION_TYPES = [
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Focus on the present moment without judgment',
    duration: 600,
    color: 'from-blue-400 to-cyan-400',
    icon: '🧠'
  },
  {
    id: 'breathing',
    name: 'Breathing',
    description: 'Follow your breath to find calm',
    duration: 300,
    color: 'from-green-400 to-emerald-400',
    icon: '🌬️'
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    description: 'Scan through your body with awareness',
    duration: 900,
    color: 'from-purple-400 to-indigo-400',
    icon: '👁️'
  },
  {
    id: 'loving-kindness',
    name: 'Loving Kindness',
    description: 'Cultivate compassion for yourself and others',
    duration: 600,
    color: 'from-pink-400 to-rose-400',
    icon: '💖'
  },
  {
    id: 'guided',
    name: 'Guided',
    description: 'Follow along with a guided meditation',
    duration: 1200,
    color: 'from-orange-400 to-red-400',
    icon: '🎧'
  }
];

// Journal constants
export const JOURNAL_PROMPTS = [
  "What am I grateful for today?",
  "What challenged me today and how did I handle it?",
  "What emotions did I experience today?",
  "What made me smile today?",
  "What would I like to improve about today?",
  "What did I learn about myself today?",
  "How did I take care of myself today?",
  "What am I looking forward to?",
  "What's weighing on my mind right now?",
  "What would make tomorrow a great day?"
];

export const JOURNAL_TAGS = [
  'gratitude',
  'reflection',
  'challenge',
  'achievement',
  'struggle',
  'growth',
  'self-care',
  'relationships',
  'work',
  'health',
  'goals',
  'dreams'
];

// App constants
export const APP_CONFIG = {
  name: 'MindSpace',
  version: '1.0.0',
  description: 'Your mental wellness companion',
  supportEmail: 'support@mindspace.app',
  website: 'https://mindspace.app',
  crisisResources: [
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      url: 'https://www.crisistextline.org/',
      description: 'Free, 24/7 crisis counseling'
    },
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      url: 'https://suicidepreventionlifeline.org/',
      description: '24/7 free and confidential support'
    },
    {
      name: 'SAMHSA Helpline',
      phone: '1-800-662-4357',
      url: 'https://www.samhsa.gov/find-help/national-helpline',
      description: 'Treatment referral and information service'
    }
  ]
};

// Feature flags
export const FEATURE_FLAGS = {
  MOOD_TRACKING: true,
  JOURNAL: true,
  MEDITATION: true,
  ANALYTICS: true,
  SOCIAL_FEATURES: false,
  OFFLINE_MODE: true,
  DATA_EXPORT: true
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    VERIFY: '/auth/verify'
  },
  MOOD: {
    LOG: '/mood/log',
    HISTORY: '/mood/history',
    ANALYTICS: '/mood/analytics'
  },
  JOURNAL: {
    ENTRIES: '/journal/entries',
    ENTRY: '/journal/entries/:id'
  },
  MEDITATION: {
    SESSIONS: '/meditation/sessions',
    START: '/meditation/sessions/start',
    COMPLETE: '/meditation/sessions/:id/complete',
    STATS: '/meditation/stats'
  }
};

// Validation constants
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 100
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};

export default {
  MOOD_EMOJIS,
  MOOD_COLORS,
  MOOD_INTENSITY_LABELS,
  MOOD_FACTORS,
  MEDITATION_TYPES,
  JOURNAL_PROMPTS,
  JOURNAL_TAGS,
  APP_CONFIG,
  FEATURE_FLAGS,
  STORAGE_KEYS,
  API_ENDPOINTS,
  VALIDATION
};