const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: String,
  channel: String,
  message: String,
  user: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Message', messageSchema);
