const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const discountSchema = new Schema({
    discount_code: {
        type: String,
        required: true,
    },
    discount_type: {
        type: String, 
        enum: ['fixed', 'percentage'],
        required: true,
    },
    discount_value: {
        type: Number, 
        required: true,
    },
    discount_description: {
        type: String,
        default: '',
    },
    discount_max_uses: {
        type: Number,
        required: true,
    },
    discount_uses_count: {
        type: Number,
        default: 0,
    },
    discount_users_used: {
        type: Array,
        default: [],
    },
    discount_start: {
        type: Date,
        required: true,
    },
    discount_end: {
        type: Date,
        required: true,
    },
    discount_status: {
        type: Boolean,
        required: true,
        default: true,
    },
    discount_shopId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    discount_productId: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
})

module.exports = model('Discounts', discountSchema)