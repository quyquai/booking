const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  room: [
    {
      type: String,
      required: true
    }
  ],
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  payment: {
    type: String,
    enum: ['Credit Card', 'Cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['Booked', 'Checkin', 'Checkout'],
    default: 'Booked'
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);