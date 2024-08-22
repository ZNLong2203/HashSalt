const { Kafka } = require("kafkajs");
const dotenv = require("dotenv").config();

const kafka = new Kafka({
    clientId: "zkare",
    brokers: [process.env.KAFKA_BROKER, process.env.KAFKA_BROKER],
})

const producer = kafka.producer();

const runProducer = async (data) => {
    await producer.connect()

    await producer.send({
        topic: "notification-topic",
        messages: [
            {
                value: JSON.stringify(`${data} has a new discount!`),
            }
        ],
    })
    console.log("Message sent successfully!")
}

module.exports = runProducer;