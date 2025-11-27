// backend/src/utils/helpers.js
exports.formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

exports.calculateStreak = (entries) => {
  if (!entries.length) return 0;
  
  let streak = 0;
  const today = new Date().toDateString();
  const lastEntryDate = new Date(entries[0].timestamp).toDateString();
  
  if (lastEntryDate === today) {
    streak = 1;
    for (let i = 1; i < entries.length; i++) {
      const currentDate = new Date(entries[i].timestamp);
      const previousDate = new Date(entries[i - 1].timestamp);
      
      const diffTime = previousDate - currentDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
  }
  
  return streak;
};

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};