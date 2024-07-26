const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const mainRoute = require('./routes/mainRoute');

const app = express();

// corsOptions = {
//     origin: process.env.FRONTEND_URL,
//     method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     optionsSuccessStatus: 200
// }

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(cors(corsOptions))
app.use(morgan('dev')) // HTTP request logger middleware for node.js
app.use(helmet()) // Secure Express apps by setting various HTTP headers
app.use(compression()) // Compress all routes to reduce the size of the response body
app.use(session({ // Express session middleware to store session data
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', mainRoute) 

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: err
    })
})

// Connect to DB with singleton pattern
class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                console.log("Database connection successful")
                app.listen(process.env.PORT || 3000, () => {
                    console.log(`Server is running on port ${process.env.PORT || 3000}`)
                })
            })
            .catch(err => {
                console.log("Database connection error")
                console.log(err)
            })
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}
Database.getInstance()