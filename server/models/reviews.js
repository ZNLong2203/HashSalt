const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const reviewSchema = new Schema({
    review_product: {
        type: Types.ObjectId,
        ref: 'Products',
        required: true
    },
    review_rating: {
        type: Number, 
        default: 0
    },
    review_count: {
        type: Number,
        default: 0
    },
    review_user_rating: {
        type: Array,
        default: []
    },
    review_comment: [{
        user: {
            type: Types.ObjectId,
            ref: 'User',
            default: null
        },
        content: {
            type: String,
            default: null
        },
        reply: [{
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            content: {
                type: String,
                default: null
            }
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
})

module.exports = model('Reviews', reviewSchema)