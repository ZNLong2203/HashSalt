const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const discountController = require('../../controllers/discounts.controller')

const router = express.Router()

// api/discounts/

// Create a new discount
router.post('/', authenticateToken, discountController.createDiscount)

// Get all discounts from the shop of that user
router.get('/shop', authenticateToken, discountController.getAllDiscountsFromShop)

// Get all discount of that product
router.get('/product/:productId', authenticateToken, discountController.getAllDiscountFromProduct)

// Update a discount when the user wants to edit it
router.put('/:id', authenticateToken, discountController.updateDiscount)

// Delete a discount when the user wants to delete it
router.delete('/:id', authenticateToken, discountController.deleteDiscount)

// Use and Cancel a discount
router.patch('/use', authenticateToken, discountController.useDiscount)
router.patch('/cancel', authenticateToken, discountController.cancelUseDiscount)

module.exports = router