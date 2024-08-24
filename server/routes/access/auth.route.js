const express = require('express')
const authController = require('../../controllers/auth.controller')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')

const router = express.Router()

// auth/
router.post('/refresh', authController.refreshAccessToken)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authenticateToken, authController.logout)

router.post('/password/forgot', authController.sendOTPVerificationEmail)
router.post('/password/otp', authController.verifyPasswordOTP)
router.patch('/password/change', authenticateToken, authController.changePassword)

module.exports = router 