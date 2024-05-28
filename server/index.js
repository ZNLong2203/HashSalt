const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require('passport')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const mainRoute = require('./routes/mainRoute');

// Creating the express app
const app = express();
dotenv.config()

// Configuring CORS
corsOptions = {
    origin: process.env.FRONTEND_URL,
    methos: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}

// Init middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(morgan('dev')) // HTTP request logger middleware for node.js
app.use(helmet()) // Secure Express apps by setting various HTTP headers
app.use(compression()) // Compress all routes to reduce the size of the response body
app.use('/', mainRoute) // Main route

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
                    console.log("Server is running on port 3000")
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