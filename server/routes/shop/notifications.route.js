const express = require('express')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const notificationsController = require('../../controllers/notifications.controller')

const router = express.Router()

// api/notifications/
router.get('/', authenticateToken, notificationsController.getDiscountNotification)

module.exports = router
