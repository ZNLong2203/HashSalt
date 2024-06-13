const PaymentService = require('../services/payments')

exports.createPaymentSession = async (req, res, next) => {
    try {
        const { cart_items } = req.body

        const paymentSession= await PaymentService.createPaymentSession(cart_items)
        res.status(200).json(paymentSession)
    } catch(err) {
        return next(err);
    }
}