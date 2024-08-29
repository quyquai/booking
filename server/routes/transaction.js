const express = require('express');

const transactionController = require('../controllers/transaction');

const router = express.Router();

router.post('/', transactionController.postTransaction);

router.get('/:userId', transactionController.getTransactions);

module.exports = router;
