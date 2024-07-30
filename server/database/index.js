const mongoose = require('mongoose')

// Connect to DB with singleton pattern
class Database {
    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect(process.env.MONGODB_URL)
            .then(() => {
                console.log("Database connection successful")
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