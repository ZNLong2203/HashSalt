const mongoose = require('mongoose')
const os = require('os')

const countConnect = () => {
    const numConnect = mongoose.connections.length
    console.log(`Number of connections: ${numConnect}`)
}

const checkOverload = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss / 1024 / 1024
        const MaxConnection = numCores * 10
        
        console.log(`Number of connections: ${numConnect}`)
        console.log(`Memory usage: ${memoryUsage} MB`)

        if(numConnect > MaxConnection) {
            console.log(`Number of connections is overloading`)
        }
    }, 1000 * 60 * 5) // 5 minutes
}

module.exports = {
    countConnect,
    checkOverload
}