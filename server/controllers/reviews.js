const User = require('../models/user')
const Reviews = require('../models/reviews')
const Products = require('../models/products')

exports.rating = async (req, res, next) => {
    try {
        const {productId, rating} = req.body
        const user = req.user

        // Check required fields
        if(!productId || !rating) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        if(rating < 0 || rating > 5) {
            return res.status(400).json({message: 'Invalid rating'})
        }

        // Create new rating or update existing rating 
        const review = await Reviews.findOne({review_product: productId})
        if(!review.review_user_rating.includes(user._id)) {
            // Calculate new rating if user has not rated yet
            const newRating = (review.review_rating * review.review_count + rating) / (review.review_count + 1)
            review.review_rating = newRating
            review.review_count += 1
            review.review_user_rating.push({user: user._id, rating: rating})
        } else {
            // Find old rating of that user in review_user_rating array
            const oldUserRating = review.review_user_rating.find(oldUserRating => oldUserRating.user === user._id)
            const newRating = (review.review_rating * review.review_count - oldUserRating.rating + rating) / review.review_count
            review.review_rating = newRating
            oldUserRating.rating = rating
        }
        await review.save()
        return res.status(201).json({message: 'Rating success'})
    } catch (err) {
        res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}