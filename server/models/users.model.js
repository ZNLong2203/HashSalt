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
    image: {
        type: String,
        default: null,
    },
    provider: {
        type: String,
        default: 'normal',
    },
    provider_id: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, {
    timestamps: true
})

module.exports = model('User', userSchema);