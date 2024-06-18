const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

exports.sendEmail = async(session) => {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: session.customer_email,
            subject: 'Order Confirmation',
            text: `Thank you for your order! Your order number is ${session.id}.`
        }
        const result = await transporter.sendMail(mailOptions)
        console.log('Email sent: ', result)
    } catch(err) {
        next(err);
    }
}