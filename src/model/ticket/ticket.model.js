const short = require("short-uuid");
const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  out: {
    type: String,
    required: true
  },
  in: {
    type: String,
    required: true
  },
  _id: {
    type: String,
    required: false
  }
});

const ticketSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: short.generate,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  nisn: {
    type: String,
    required: true,
    maxlength: 10
  },
  classGrade: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  TimeCountdown: {
    type: String,
    required: true
  },
  startTime: {
    type: String, // or Date if you prefer
    required: true
  },
  endTime: {
    type: String, // or Date if you prefer
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  subjects: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  codeStatus: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  expired: {
    type: Boolean,
    required: true
  },
  time: {
    type: [timeSchema],
    required: true
  }
});

module.exports = mongoose.model('ticket', ticketSchema);
