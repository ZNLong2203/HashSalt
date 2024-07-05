const bcrypt = require('bcrypt')
const passport = require('passport')
const dotenv = require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const refresh = require('passport-oauth2-refresh')
const User = require('../models/user')
const KeyToken = require('../models/keytoken')
const {randomBytes} = require('crypto')
const {createTokenPair} = require('../utils/createToken')
const {getInfoJson} = require('../utils/getInfo')

// Google OAuth2.0
const strategy = new GoogleStrategy({
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
                image: profile.photos[0].value,
                hashPassword: randomBytes(64).toString('hex'),
                provider: 'google',
                provider_id: profile.id,
            })
            await user.save()
        } else if(user.provider !== 'google') {
            return done(null, false)
        }

        const payload = getInfoJson({fields: ['_id', 'name', 'email', 'role'], objects: user})
        const {accessToken, refreshToken} = await createTokenPair({
            ...payload,
            provider: user.provider,
            provider_id: user.provider_id
        }, process.env.JWT_PUBLIC_KEY, process.env.JWT_PRIVATE_KEY)

        const existsToken = await KeyToken.findOne({userId: user._id})
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

        const data = {
            token_type: 'Bearer',
            accessToken,
            refreshToken,
            name: user.name,
            role: user.role
        }
        return done(null, data)
   } catch(err) {
        return done(err, null)
   }
})
passport.use(strategy)
refresh.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport