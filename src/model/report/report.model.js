const short = require("short-uuid");
const mongoose = require('mongoose');


const reportModel = new mongoose.Schema({
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
  description: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  pending: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('userReport', reportModel);
