const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const paymentSchema = new Schema({
    payment_user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment_carts: [{
        type: Types.ObjectId,
        ref: 'Carts',
        required: true
    }]
}, {
    timestamps: true
})

module.exports = model('Payments', paymentSchema)