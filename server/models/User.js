const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: String,            // for local auth
  googleId: String,               // optional google OAuth id
  providers: {
    codeforces: String,
    codechef: String,
    leetcode: String
  },
  preferences: {
    notifyBeforeMinutes: { type: Number, default: 30 }
  },
  weakTopics: [String],
  createdAt: { type: Date, default: Date.now },
  lastFetched: Date
});

module.exports = mongoose.model('User', UserSchema);
