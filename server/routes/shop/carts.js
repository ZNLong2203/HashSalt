const express = require('express');
const {authenticateToken, isAdmin} = require('../../utils/isAuth');
const cartController = require('../../controllers/carts');

const router = express.Router();

// api/carts/

// Get all cart items
router.get('/', authenticateToken, cartController.getListInCart);

// User click on product to add to cart
router.post('/add', authenticateToken, cartController.addCart);


module.exports = router;