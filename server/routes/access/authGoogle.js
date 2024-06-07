const express = require('express')
const passport = require('passport')
const dotenv = require('dotenv').config()
const {authenticateToken, isAdmin} = require('../../utils/isAuth')
const authGoogle = require('../../controllers/authGoogle')
const User = require('../../models/user')
const KeyToken = require('../../models/keytoken')

const router = express.Router()

// auth/

router.get('/google', authGoogle.google)
router.get('/google/callback', authGoogle.googleCallback)
router.get('/google/success', authGoogle.googleSuccess)


module.exports = router