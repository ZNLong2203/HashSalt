const express = require('express')
const router = express.Router()

const auth = require('./access/auth')
const product = require('./shop/product')

router.use('/auth', auth)
router.use('/api/product', product)

module.exports = router