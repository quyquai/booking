const Transaction = require('../models/transaction');

exports.postTransaction = async (req, res) => {
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } = req.body;

  const transaction = new Transaction({
    user,
    hotel,
    room,
    dateStart,
    dateEnd,
    price,
    payment,  
    status
  });

  try {
    const savedTransaction = await transaction.save();
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: savedTransaction
    });
  } catch (error) {
    console.error('Failed to create transaction:', error);
    res.status(500).json({
      message: 'Failed to create transaction',
      error: error.message
    });
  }
};

exports.getTransactions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const transactions = await Transaction.find({ user: userId }).populate('hotel');
    res.json(transactions);
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    res.status(500).json({
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};