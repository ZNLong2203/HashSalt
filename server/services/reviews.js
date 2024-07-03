const User = require('../models/user')
const Reviews = require('../models/reviews')
const Products = require('../models/products')

class ReviewService {
    async getRatingProducts(productId) {
        try {
            const rating = await Reviews.findOne({review_product: productId})
            if(!rating) {
                return 0
            }
            return rating.review_rating
        } catch (err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async rating(productId, rating, user) {
        try {
            // Create new rating or update existing rating 

            const review = await Reviews.findOne({review_product: productId})
            if(!review) {
                const newReview = new Reviews({
                    review_product: productId,
                    review_rating: rating,
                    review_count: 1,
                    review_user_rating: [{user: user._id, rating}]
                })
                await newReview.save()
                return newReview
            }
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
            return review
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async createComment(productId, content, user) {
        try {
            // Check if user has already commented

            const review = await Reviews.findOne({
                review_product: productId,
                "review_comment.user": user._id
            })

            if(review) {
                throw new Error('You have already commented')
            }

            // Create new comment

            const newComment = new Reviews({
                review_product: productId,
                review_comment: {
                    user: user._id,
                    content
                }
            })
            await newComment.save()
            return newComment
        } catch (err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async createReply(productId, userReply, content, user) {
        try {
            const newReply = await Reviews.findOneAndUpdate({
                review_product: productId,
                "review_comment.user": userReply
            }, {
                $push: {
                    "review_comment.$.reply": {
                        user: user._id,
                        content
                    }
                }
            })
            return newReply
        } catch (err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }
}

module.exports = new ReviewService();