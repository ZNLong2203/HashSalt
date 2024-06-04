const express = require('express')
const passport = require('passport')
const dotenv = require('dotenv')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../models/user')
const KeyToken = require('../../models/keytoken')

const router = express.Router()
dotenv.config()

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/auth/login'}), (req, res) => {
    res.redirect(process.env.FRONTEND_URL)
})

// Google OAuth2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({_id: profile.id}, (err, user) => {
        if(err) {
            return done(err)
        }
        if(!user) {
            const newUser = new User({
                _id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: 'user'
            })
            newUser.save((err) => {
                if(err) {
                    return done(err)
                }
                return done(null, newUser)
            })
        }
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = router