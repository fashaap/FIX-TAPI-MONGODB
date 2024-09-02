const short = require("short-uuid");
const mongoose = require('mongoose');

const userNotificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: short.generate,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('userNotification', userNotificationSchema);
