const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const productController = require('../../controllers/products')

const router = express.Router()

// api/products/
router.post('/create', authenticateToken, productController.createProduct)

router.get('/shopproduct', authenticateToken, productController.getProductShop)
router.get('/search', productController.searchProduct)

// Get all products to display on the home page
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getSingleProduct)

// Publish and unpublish a product
router.patch('/published/:id', authenticateToken, productController.publishedProduct)
router.patch('/unpublished/:id', authenticateToken, productController.unpublishedProduct)

module.exports = router