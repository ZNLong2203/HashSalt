const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const discountController = require('../../controllers/discounts')

const router = express.Router()

// api/discounts/

// Create a new discount
router.post('/create', authenticateToken, discountController.createDiscount)

// Get all discounts from the shop of that user
router.get('/shop/:shopId', authenticateToken, discountController.getAllDiscountsFromShop)

// Get all discount of that product
router.get('/product/:productId', authenticateToken, discountController.getAllDiscountFromProduct)

// Update a discount when the user wants to edit it
router.put('/:id', authenticateToken, discountController.updateDiscount)

// Delete a discount when the user wants to delete it
router.delete('/:id', authenticateToken, discountController.deleteDiscount)

module.exports = router