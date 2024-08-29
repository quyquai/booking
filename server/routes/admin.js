const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/info', adminController.getInfo);

router.get('/transactions', adminController.getTransactions);

router.get('/hotels', adminController.getHotels);

router.get('/rooms', adminController.getRooms);

router.post('/add-hotels', adminController.postHotel);

router.post('/add-room', adminController.postRoom);

router.post('/delete-hotel', adminController.postDeleteHotel);

module.exports = router;
