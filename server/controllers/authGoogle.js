const User = require('../models/user')
const KeyToken = require('../models/keytoken')
const ggPassport = require('../services/googleAuthConf')

// Google OAuth2.0
exports.google = async (req, res, next) => {
    try {
        ggPassport.authenticate('google', {scope: ['profile', 'email']})(req, res, next)
    } catch(err) {
        console.log(err)
        return res.status(400).json({message: 'Something went wrong'})
    }
}

exports.googleCallback = async (req, res, next) => {
    try {
        ggPassport.authenticate('google', (err, user) => {
            if(err) {
                return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
            }
            if(!user) {
                return res.status(400).json({message: 'User not found'})
            }
            res.cookie('refreshToken', user.refreshToken, {httpOnly: true})
            return res.redirect(process.env.FRONTEND_URL)
        })(req, res, next)
    } catch(err) {
        console.log(err)
        return res.status(400).json({message: 'Something went wrong'})
    }
}

exports.googleLogout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        const keyToken = await KeyToken.findOne({refreshToken: refreshToken})
        await keyToken.delete
        res.clearCookie('refreshToken')
        return res.status(200).json({message: 'Logout success'})
    } catch(err) {
        console.log(err)
        return res.status(400).json({message: 'Something went wrong'})
    }
}

exports.googleSuccess = async (req, res, next) => {
    try {
        res.redirect(process.env.FRONTEND_URL)
    } catch(err) {
        console.log(err)
        return res.status(400).json({message: 'Something went wrong'})
    }
}