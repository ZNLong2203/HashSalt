const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const OrderController = require('../../controllers/orders')

const router = express.Router()

// api/orders/

// Post cart_items to create a payment session with STRIPE
router.post('/', authenticateToken, OrderController.createOrderSession)
router.post('/success', authenticateToken, OrderController.successOrder)
router.get('/', authenticateToken, OrderController.getListOrder)

module.exports = router