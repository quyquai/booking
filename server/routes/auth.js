const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/users/register', authController.postRegister);

router.post('/users/login', authController.postLogin);

router.post('/admin/register', authController.postAdminRegister)

router.post('/admin/login', authController.postAdminLogin)

module.exports = router;