const mongoose = require('mongoose')
const express = require('express')
const app = express()

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

module.exports = Database