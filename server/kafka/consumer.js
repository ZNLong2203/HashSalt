const { Kafka } = require("kafkajs");
const dotenv = require("dotenv").config();
const Notification = require("../models/notifications.model");

const kafka = new Kafka({
    clientId: "zkare",
    brokers: [process.env.KAFKA_BROKER, process.env.KAFKA_BROKER],
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

module.exports = runConsumer;