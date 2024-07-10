const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const orderSchema = new Schema({
    order_user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_delivery: [{
        order_carts: {
            type: Types.ObjectId,
            ref: 'Carts',
            required: true
        },
        order_status: {
            type: String,
            enum: ['Delivered', 'Pending', 'Cancelled'],
            default: 'Pending'
        },
    }],
}, {
    timestamps: true
})

module.exports = model('Orders', orderSchema)