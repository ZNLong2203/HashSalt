const express = require('express')
const reviewController = require('../../controllers/reviews')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')

const router = express.Router()

// api/reviews/

// Create and update a rating review
router.post('/rating', authenticateToken, reviewController.rating)

// Create a comment review
router.post('/comment', authenticateToken, reviewController.createComment)

// Create a reply review
router.post('/reply', authenticateToken, reviewController.createReply)

module.exports = router


