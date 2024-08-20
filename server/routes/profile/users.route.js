const express = require('express');
const { authenticateToken, isAdmin } = require('../../utils/isAuth');
const userController = require('../../controllers/users.controller');

const router = express.Router();

// api/users/
router.get('/', authenticateToken, userController.getUserInfo);
router.patch('/', authenticateToken, userController.updateUserInfo);

module.exports = router;