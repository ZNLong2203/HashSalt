const mongoose = require('mongoose')
const {Schema, model, Types} = mongoose

const notificationSchema = new Schema({
    notification_title: {
        type: String,
        required: true,
    },
    notification_status: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true
})

module.exports = model('Notifications', notificationSchema)