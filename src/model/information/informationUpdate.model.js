const short = require("short-uuid");
const mongoose = require('mongoose');

const informationUpdateSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: short.generate,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('userInformationUpdate', informationUpdateSchema);