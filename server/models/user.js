const mongoose = require('mongoose');
const {Schema, model, Types} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hashPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema);