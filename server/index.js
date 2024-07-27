const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
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
const Database = require('./configs/database')

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL, process.env.LOCAL];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(morgan('dev')) // HTTP request logger middleware for node.js
app.use(helmet()) // Secure Express apps by setting various HTTP headers
app.use(compression()) // Compress all routes to reduce the size of the response body
app.use(session({ 
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

Database.getInstance()