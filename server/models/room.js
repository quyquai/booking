const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  roomNumbers: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Room', roomSchema);