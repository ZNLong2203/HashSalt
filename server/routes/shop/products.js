const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const productController = require('../../controllers/products')
const {upload} = require('../../configs/cloudinaryConfig')

const router = express.Router()

// api/products/

// Create a new product
router.post('/', authenticateToken, upload.single('product_image'), productController.createProduct)

// Get all products from the shop of that user
router.get('/shop', authenticateToken, productController.getProductShop)

// Search for a product using query ?name=product_name
router.get('/name', productController.searchProduct)

// Search for a product by type using params type=product_type
router.get('/type/:type', productController.searchProductByCategory)

// Update a product when the user wants to edit it
router.put('/:id', authenticateToken, productController.updatedProduct)

// Delete a product when the user wants to delete it
router.delete('/:id', authenticateToken, productController.deleteProduct)

// Get all products to display on the home page
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getSingleProduct)

// Publish and unpublish a product
router.patch('/published/:id', authenticateToken, productController.publishedProduct)
router.patch('/unpublished/:id', authenticateToken, productController.unpublishedProduct)

module.exports = router