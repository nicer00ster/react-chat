const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ''
  },
  uid: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('UserSession', UserSessionSchema);
