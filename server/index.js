const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const passport = require('passport')

const auth = require('./routes/auth');

const app = express();

dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/auth', auth)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Server connected to MongoDB"),
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server is running on port 3000")
        })
    })
    .catch(err => console.log(err))