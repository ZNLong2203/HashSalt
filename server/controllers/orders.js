const OrderService = require('../services/orders')
 
exports.createOrderSession = async (req, res, next) => {
    try {
        const { cart_items } = req.body
        const user = req.user

        const orderSession= await OrderService.createOrderSession(cart_items, user)
        res.status(200).json(orderSession)
    } catch(err) {
        next(err);
    }
}

exports.successOrder = async (req, res, next) => {
    try {
        const session_id = req.query.session_id
        const userId = req.user._id
        await OrderService.successOrder(session_id, userId)
        res.status(200).json({message: 'Payment successful'})
    } catch(err) {
        next(err)
    }
}

exports.getListOrder = async (req, res, next) => {
    try {
        const userId = req.user._id
        const orders = await OrderService.getListOrder(userId)

        console.log(orders.order_delivery)
        res.status(200).json(orders)
    } catch(err) {

    }
}