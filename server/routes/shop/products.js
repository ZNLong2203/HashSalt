const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const productController = require('../../controllers/products')

const router = express.Router()

// api/products/
router.post('/create', authenticateToken, productController.createProduct)
router.get('/shopproduct', authenticateToken, productController.getProductShop)
router.get('/search', productController.searchProduct)

module.exports = router