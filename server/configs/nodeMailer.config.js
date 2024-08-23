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
            subject: `Order Confirmation in Zkare Shop`,
            html: `
                <h1>Thank You for Your Order!</h1>
                <p>Dear ${session.customer_details.name},</p>
                <p>We are excited to confirm your order. Below are the details:</p>
                <h3>Order Number: ${session.id}</h3>
                <p><strong>Total: $${session.amount_total.toFixed(2) / 100}</strong></p>
                <p>We will notify you once your items are shipped. If you have any questions, feel free to reply to this email.</p>
                <p>Thank you for shopping with us!</p>
                <p>Best regards,<br/>The Zkare Team</p>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', result);
    } catch (err) {
        throw err;
    }
};

exports.sendOTP = async(email, otp) => {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: `One Time Password (OTP) for Zkare Shop`,
            html: `
                <h1>One Time Password (OTP)</h1>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>This OTP will expire in 5 minutes. Do not share this OTP with anyone.</p>
                <p>If you did not request this OTP, please ignore this email.</p>
                <p>Best regards,<br/>The Zkare Team</p>
            `
        };

        const result = await transporter.sendOTP(mailOptions);
        console.log('Email sent with OTP: ', result);
    } catch (err) {
        throw err;
    }
}