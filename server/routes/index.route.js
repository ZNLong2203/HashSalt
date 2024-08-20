const express = require('express')
const router = express.Router()

const auth = require('./access/auth.route')
const authGoogle = require('./access/authGoogle.route')
const products = require('./shop/products.route')
const discounts = require('./shop/discounts.route')
const reviews = require('./shop/reviews.route')
const carts = require('./shop/carts.route')
const orders = require('./order/order.route')
const dashboard = require('./admin/dashboard.route')
const users= require('./profile/users.route')

router.use('/auth', auth)
router.use('/auth', authGoogle)
router.use('/api/products', products)
router.use('/api/discounts', discounts)
router.use('/api/reviews', reviews)
router.use('/api/carts', carts)
router.use('/api/orders', orders)
router.use('/api/dashboard', dashboard)
router.use('/api/users', users)

module.exports = router