const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const productController = require('../../controllers/product')

const router = express.Router()

router.post('/create', authenticateToken, productController.createProduct)

module.exports = router