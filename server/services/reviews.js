const User = require('../models/user')
const Reviews = require('../models/reviews')
const Products = require('../models/products')

class ReviewService {
    async rating(productId, rating, user) {
        try {
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