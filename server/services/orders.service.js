const User = require('../models/users.model');
const Carts = require('../models/carts.model');
const { Products } = require('../models/products.model');
const Order = require('../models/orders.model');
const { sendEmail } = require('../configs/nodeMailer.config');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class OrderService {
    async createOrderSession(cart_items, user) {
        try {
            const sessionData = {
                line_items: cart_items.map(item => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.cart_product.product_name,
                                images: [item.cart_product.product_image || "https://applecenter.com.vn/uploads/cms/16632365177447.jpg"],
                                metadata: { 
                                    product_id: item.cart_product._id.toString()
                                }
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

            const session = await stripe.checkout.sessions.create(sessionData);
            return session;
        } catch (error) {
            console.error("Stripe Error:", error);
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async successOrder(session_id, userId) {
        try {
            // Retrieve the session to check if the payment is successful
            const session = await stripe.checkout.sessions.retrieve(session_id, {
                expand: ['line_items.data.price.product']
            });

            if (session.payment_status === 'paid') {
                const cartCompleted = await Carts.findOneAndUpdate({
                    cart_userId: userId,
                    cart_status: 'active'
                }, { 
                    cart_status: 'completed',
                    cart_total: session.amount_total / 100
                }, { new: true, returnDocument: 'after' });

                // Insert cart completed into payment collection
                await Order.findOneAndUpdate({
                    order_user: userId,
                }, {
                    $push: {
                        "order_delivery": {
                            order_carts: cartCompleted._id,
                            order_status: "Delivered"
                        }
                    }
                }, {upsert: true, new: true})

                // Send email to user to confirm the payment
                await sendEmail(session);

                // Decrement the quantity of the product in the database
                session.line_items.data.forEach(async (item) => {
                    const productId = item.price.product.metadata.product_id;
                    const product = await Products.findById(productId);
                    product.product_quantity -= item.quantity;
                    await product.save();
                });

                return { message: 'Payment success' };
            } else {
                return { message: 'You are not paid yet' };
            }
        } catch (error) {
            console.error("Stripe Error:", error); 
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async getListOrder(userId) {
        try {
            const orders = await Order.findOne({
                order_user: userId
            }).populate({
                "path": "order_delivery.order_carts",
                "populate": {
                    "path": "cart_items.cart_product"
                }
            });
            
            return orders;
        } catch (err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }
}

module.exports = new OrderService()