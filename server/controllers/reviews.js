const User = require('../models/user')
const Reviews = require('../models/reviews')
const Products = require('../models/products')
const ReviewService = require('../services/reviews')

exports.getRatingProducts = async (req, res, next) => {
    try {
        const { productId } = req.params

        const rating = await ReviewService.getRatingProducts(productId)
        return res.status(200).json({rating})
    } catch (err) {
        next(err);
    }
}

exports.rating = async (req, res, next) => {
    try {
        const { productId, rating } = req.body
        const user = req.user

        // Check required fields
        if(!productId || !rating) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        if(rating < 0 || rating > 5) {
            return res.status(400).json({message: 'Invalid rating'})
        }

        const review = await ReviewService.rating(productId, rating, user)
        return res.status(201).json({
            message: 'Rating success',
            metadata: review
        })
    } catch (err) {
        next(err);
    }
}

exports.createComment = async (req, res, next) => {
    try {
        const { productId, content } = req.body
        const user = req.user
        
        // Check required fields
        if(!productId || !content) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }

        const newComment = await ReviewService.createComment(productId, content, user)
        return res.status(201).json({
            message: 'Comment created',
            metadata: newComment
        })
    } catch (err) {
        next(err);
    }
}

exports.createReply = async (req, res, next) => {
    try {
        const { productId, userReply, content } = req.body
        const user = req.user

        // Check required fields
        if(!productId || !userReply || !content) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }

        const newReply = await ReviewService.createReply(productId, userReply, content, user)
        return res.status(201).json({
            message: 'Reply created',
            metadata: newReply    
        })
    } catch (err) {
        next(err);
    }
}