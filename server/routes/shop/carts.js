const express = require('express');
const {authenticateToken, isAdmin} = require('../../utils/isAuth');
const cartController = require('../../controllers/carts');

const router = express.Router();

// api/carts/

// User click on product to add to cart
router.post('/add', authenticateToken, cartController.addCart);

module.exports = router;