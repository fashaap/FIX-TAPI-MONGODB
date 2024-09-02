const short = require("short-uuid");
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const userQuestionnaireSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: short.generate,
    required: true
  },
  idUser: {
    type: String,
    required: true
  },
  answers: {
    type: [answerSchema],
    required: true
  }
});

module.exports = mongoose.model('userQuestionnaire', userQuestionnaireSchema);
