const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const PaymentController = require('../../controllers/payments')

const router = express.Router()

// api/payments/

// Post cart_items to create a payment session with STRIPE
router.post('/', authenticateToken, PaymentController.createPaymentSession)
router.post('/success', authenticateToken, PaymentController.successPayment)

module.exports = router