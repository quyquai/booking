const express = require('express');

const roomController = require('../controllers/room');

const router = express.Router();

router.get('/rooms', roomController.getRooms)

module.exports = router