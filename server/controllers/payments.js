const PaymentService = require('../services/payments')
const { sendEmail } = require('../configs/nodemailerConfig')
 
exports.createPaymentSession = async (req, res, next) => {
    try {
        const { cart_items } = req.body
        const user = req.user

        const paymentSession= await PaymentService.createPaymentSession(cart_items, user)
        console.log(paymentSession)
        res.status(200).json(paymentSession)
    } catch(err) {
        next(err);
    }
}

exports.successPayment = async (req, res, next) => {
    try {
        const session_id = req.query.session_id

        await PaymentService.successPayment(session_id)
        res.status(200).json({message: 'Payment successful'})
    } catch(err) {
        next(err)
    }
}