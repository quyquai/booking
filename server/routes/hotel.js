const express = require('express');
const hotelController = require('../controllers/hotel');

const router = express.Router();

router.get('/city', hotelController.getCountByCity);

router.get('/type', hotelController.getCountByType);

router.get('/rating', hotelController.getCountByRating);

router.get('/search', hotelController.getHotelSearch);

router.get('/:id', hotelController.getHotels);

module.exports = router;