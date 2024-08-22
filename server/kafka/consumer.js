const { Kafka } = require("kafkajs");
const dotenv = require("dotenv").config();
const Notification = require("../models/notifications.model");

const kafka = new Kafka({
    clientId: "zkare",
    brokers: [process.env.KAFKA_BROKER],
    connectionTimeout: 20000,
})

const consumer = kafka.consumer({
    groupId: "kafka",
})

const runConsumer = async() => {
    await consumer.connect()
    await consumer.subscribe({
        topic: "notification-topic",
        fromBeginning: true,
    })

    const processMessages = async () => {
        await consumer.run({
            eachMessage: async({ partition, message }) => {
                console.log({
                    value: message.value.toString(),
                })
                await Notification.create({
                    notification_title: message.value.toString(),
                    notification_status: true,
                })
            }
        })
    }

    setInterval(async () => {
        try {
            await processMessages();    
        } catch(err) {
            console.log(`Error processing messages: ${err.message}`)
        }
    }, 30000)
}


module.exports = runConsumer;