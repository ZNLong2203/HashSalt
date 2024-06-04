const bcrypt = require('bcrypt')
const passport = require('passport')
const dotenv = require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {getInfoJson} = require('../utils/getInfo')
const User = require('../models/user')
const KeyToken = require('../models/keytoken')
const {randomBytes} = require('crypto')

// Google OAuth2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
   try {
        let user = await User.findOne({email: profile.emails[0].value})
        if(!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                hashPassword: randomBytes(64 ).toString('hex'),
                provider: 'google',
                provider_id: profile.id,
            })
            await user.save()
        } else if(user.provider !== 'google') {
            return done(null, false)
        }

        // RefreshToken of google api only have for the first time
        if(refreshToken) {
            let existsToken = await KeyToken.findOne({userId: user._id})
            if(existsToken) {
                existsToken.refreshToken = refreshToken
                await existsToken.save()
            } else {
                const keyToken = new KeyToken({
                    userId: user._id,
                    refreshToken
                })
                await keyToken.save()
            }
        } else {
            refreshToken = await KeyToken.findOne({userId: user._id})
        }

        const data = {
            token_type: 'Bearer',
            accessToken,
            refreshToken,
            name: user.name,
            role: user.role
        }
        return done(null, data)
   } catch(err) {
        done(err, false)
   }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport