const express = require('express')
const router = express.Router()

const auth = require('./access/auth')
const authGoogle = require('./access/authGoogle')
const products = require('./shop/products')
const discounts = require('./shop/discounts')

router.use('/auth', auth)
router.use('/auth', authGoogle)
router.use('/api/products', products)
router.use('/api/discounts', discounts)

module.exports = router