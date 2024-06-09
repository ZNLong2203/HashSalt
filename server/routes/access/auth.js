const express = require('express')
const authController = require('../../controllers/auth')
const {authenticateToken, isAdmin} = require('../../utils/isAuth')

const router = express.Router()

// auth/
router.post('/refresh', authController.refreshAccessToken)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authenticateToken, authController.logout)

router.get('/test', authenticateToken, (req, res) => {
    res.json({message: "Access granted"})
})

module.exports = router 