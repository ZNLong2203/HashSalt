const mongoose = require('mongoose');
const {Schema, model, Types} = mongoose;

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true,
    },
    expired: {
        type: Date,
        default: Date.now() + 300000
    },
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps: true
})

module.exports = model('Otp', otpSchema);