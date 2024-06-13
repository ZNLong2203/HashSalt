const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const cartSchema = new Schema({
    cart_status: {
        type: String,
        enum: ['active', 'completed', 'cancelled', 'pending'],
        required: true,
        default: 'active'
    },
    cart_items: [{
        cart_product: {
            type: Types.ObjectId,
            ref: 'Products',
            required: true
        },
        cart_quantity: {
            type: Number,
            required: true,
            default: 0
        },
        cart_discount: {
            type: Types.ObjectId,
            ref: 'Discounts',
            default: null
        }
    }],
    cart_userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Carts', cartSchema)