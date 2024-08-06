const DiscountService = require('../services/discounts.service')

exports.createDiscount = async (req, res, next) => {
    try {
        const { discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_productId } = req.body.newDiscount
        const discount_shopId = req.user._id

        if(!discount_code || !discount_type || !discount_description || !discount_value || !discount_max_uses || !discount_start || !discount_end || !discount_shopId || !discount_productId){
            return res.status(400).json({message: 'Please fill in all fields'})
        }

        if(new Date(discount_end) < new Date(discount_start) || new Date() > new Date(discount_end)){
            return res.status(400).json({message: 'Invalid date'})
        }

        const discount = await DiscountService.createDiscount(discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_shopId, discount_productId)
        return res.status(201).json({
            message: 'Discount created',
            metadata: discount
        })
    } catch(err) {
        next(err);
    }
}

exports.getAllDiscountsFromShop = async (req, res, next) => {
    try {
        const { shopId, page } = req.query
        const limit = 9
        const skip = (page - 1) * limit

        const { discounts, totalPage } = await DiscountService.getAllDiscountsFromShop(shopId, skip, limit)
        
        return res.status(200).json({
            discounts,
            totalPage
        })
    } catch(err) {
        next(err);
    }
}

exports.getAllDiscountFromProduct = async (req, res, next) => {
    try {
        const { productId } = req.params
        
        const discounts = await DiscountService.getAllDiscountFromProduct(productId)

        return res.status(200).json(discounts)
    } catch(err) {
        next(err);
    }
}

exports.updateDiscount = async (req, res, next) => {
    try {
        const { id } = req.params
        const discount_shopId = req.user._id
        const { discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_status,  discount_productId } = req.body
        
        if(!discount_code || !discount_type || !discount_description || !discount_value || !discount_max_uses || !discount_start || !discount_end || !discount_status || !discount_shopId || !discount_productId) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }

        if(new Date(discount_end) < new Date(discount_start) || new Date() > new Date(discount_end)) {
            return res.status(400).json({message: 'Invalid date'})
        }

        await DiscountService.updateDiscount(id, discount_shopId, discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_status, discount_productId)
        return res.status(200).json({message: 'Discount updated'})
    } catch(err) {
        next(err);
    }
}

exports.deleteDiscount = async (req, res, next) => {
    try {
        const { id } = req.params
        const discount_shopId = req.user._id

        await DiscountService.deleteDiscount(id, discount_shopId)

        return res.status(200).json({message: 'Discount deleted'})
    } catch(err) {
        next(err);
    }
}

exports.useDiscount = async (req, res, next) => {
    try {
        const { discount_code, productId } = req.body
        const user = req.user
        
        const {Price, Discount, Type, AfterDiscount} = await DiscountService.useDiscount(discount_code, productId, user)

        return res.status(200).json({Price, Discount, Type, AfterDiscount})
    } catch(err) {
        next(err);
    }
}

exports.cancelUseDiscount = async (req, res, next) => {
    try {
        const { discount_code, productId } = req.body
        const user = req.user

        await DiscountService.cancelUseDiscount(discount_code, productId, user)

        return res.status(200).json({message: 'Discount canceled'})
    } catch(err) {
        next(err);
    }
}