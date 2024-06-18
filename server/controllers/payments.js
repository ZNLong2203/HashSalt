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
        return next(err);
    }
}

exports.successPayment = async (req, res, next) => {
    try {
        const session = req.body
        if(session.payment_status === 'paid') {
            await sendEmail(session)
            res.status(200).json({message: 'Payment success'})
        } else {
            res.status(400).json({message: 'You are not paid yet'})
        }
    } catch(err) {
        next(err)
    }
}