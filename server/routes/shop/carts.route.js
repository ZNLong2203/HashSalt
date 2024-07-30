const express = require('express');
const {authenticateToken, isAdmin} = require('../../utils/isAuth');
const cartController = require('../../controllers/carts.controller');

const router = express.Router();

// api/carts/

// Get all cart items
router.get('/', authenticateToken, cartController.getListInCart);

// User click on product to add to cart
router.post('/', authenticateToken, cartController.addCart);

// User change quantity of product in cart
router.patch('/', authenticateToken, cartController.changeQuantityCart);

// User delete item in cart
router.delete('/one', authenticateToken, cartController.deleteOneItem);
router.delete('/all', authenticateToken, cartController.deleteAllItem);

module.exports = router;