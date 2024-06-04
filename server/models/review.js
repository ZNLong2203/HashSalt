const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const reviewSchema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Products',
        required: true
    },
    rating: {
        type: Number, 
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    comment: [{
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        cmt: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
})

module.exports = model('Review', reviewSchema)