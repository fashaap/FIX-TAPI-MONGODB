const mongoose = require('mongoose');

const userAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  displayImage: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  },
  code: {
    type: String || Number,
    required: true
  },
});

module.exports = mongoose.model('userAdmin', userAdminSchema);
