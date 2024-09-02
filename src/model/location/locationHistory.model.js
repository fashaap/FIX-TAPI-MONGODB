const short = require("short-uuid");
const mongoose = require('mongoose');

const locationHistorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: short.generate,
      required: true
    },
    idUser: {
      type: String,
      required: true
    },
    idTicket: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,  // Changed to Number for latitude
      required: true
    },
    longitude: {
      type: Number,  // Changed to Number for longitude
      required: true
    },
    accuracy: {
      type: Number,  // Added accuracy
      required: true
    },
    speed: {
      type: Number,  // Added speed
      required: true
    },
    timestamp: {
      type: Number,  // Added timestamp
      required: true
    }
  }
);

module.exports = mongoose.model('locationHistory', locationHistorySchema);
