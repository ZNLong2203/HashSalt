const express = require('express')
const reviewController = require('../../controllers/reviews')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')

const router = express.Router()

// api/reviews/

// Create and update a rating review
router.patch('/rating', authenticateToken, reviewController.rating)

module.exports = router


