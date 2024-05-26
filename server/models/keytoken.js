const mongoose = require('mongoose');
const {Schema, model, Types} = mongoose;

const keyTokenSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('KeyToken', keyTokenSchema)