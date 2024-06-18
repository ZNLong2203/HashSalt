const User = require('../models/user')
const Carts = require('../models/carts')
const { sendEmail } = require('../configs/nodemailerConfig')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class PaymentService{
    async createPaymentSession(cart_items, user) {
        try {
            const sessionData = {
                line_items: cart_items.map(item => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.cart_product.product_name,
                                images: ["https://applecenter.com.vn/uploads/cms/16632365177447.jpg"],
                            },
                            unit_amount: item.cart_product.product_price * 100
                        },
                        quantity: item.cart_quantity,
                    }
                }),
                customer_email: user.email,
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}`
            }

            const session = await stripe.checkout.sessions.create(sessionData)
            return session
        } catch (error) {
            // Log the Stripe error for debugging
            console.error("Stripe Error:", error); 
            throw error; // Rethrow the error to be handled by the route
        }
    }

    async successPayment(session_id) {
        try {
            const session = await stripe.checkout.sessions.retrieve(session_id)
            if(session.payment_status === 'paid') {
                await sendEmail(session)
                return {message: 'Payment success'}
            } else {
                return {message: 'You are not paid yet'}
            }
        } catch (error) {
            console.error("Stripe Error:", error); 
            throw error; 
        }
    }
}

module.exports = new PaymentService()