const express = require('express')
const router = express.Router()

const auth = require('./access/auth')
const products = require('./shop/products')

router.use('/auth', auth)
router.use('/api/products', products)

module.exports = router