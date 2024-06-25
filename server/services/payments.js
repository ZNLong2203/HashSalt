const User = require('../models/user')
const Carts = require('../models/carts')
const Products = require('../models/products')
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
            console.error("Stripe Error:", error); 
            throw error; 
        }
    }

    async successPayment(session_id, userId) {
        try {
            // Retrieve the session to check if the payment is successful
            const session = await stripe.checkout.sessions.retrieve(session_id)
            if(session.payment_status === 'paid') {
                await Carts.findOneAndUpdate({
                    cart_userId: userId,
                    cart_status: 'active'
                }, {cart_status: 'completed'}, {new: true})
                
                // Send email to user to confirm the payment
                await sendEmail(session)

                // Decrement the quantity of the product in database
                session.display_items.forEach(async item => {
                    const product = await Products.findById(item.custom.product_id)
                    product.product_quantity -= item.quantity
                    await product.save()
                })
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