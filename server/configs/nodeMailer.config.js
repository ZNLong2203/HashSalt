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
            subject: `Order Confirmation - Order #${session.id}`,
            html: `
                <h1>Thank You for Your Order!</h1>
                <p>Dear ${session.customer_name},</p>
                <p>We are excited to confirm your order. Below are the details:</p>
                <h3>Order Number: ${session.id}</h3>
                <p><strong>Total: $${session.total_amount.toFixed(2)}</strong></p>
                <p>We will notify you once your items are shipped. If you have any questions, feel free to reply to this email.</p>
                <p>Thank you for shopping with us!</p>
                <p>Best regards,<br/>The [Your Company Name] Team</p>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', result);
    } catch (err) {
        throw err;
    }
};