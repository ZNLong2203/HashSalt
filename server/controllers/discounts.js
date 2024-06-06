const User = require('../models/user')
const Discounts = require('../models/discounts')

exports.createDiscount = async (req, res) => {
    try {
        const {discount_code, discount_description, discount_percent, discount_max_uses, discount_start, discount_end, discount_status, discount_shopId, discount_productId} = req.body
        // Check required fields
        if(!discount_code || !discount_description || !discount_percent || !discount_max_uses || !discount_start || !discount_end || !discount_status || !discount_shopId || !discount_productId) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        if(new Date() < new Date(discount_start) || new Date() > new Date(discount_end)) {
            return res.status(400).json({message: 'Invalid date'})
        }

        // Check if code already exists
        const checkCode = await Discounts.findOne({
            discount_code,
            discount_shopId
        }).lean()
        if(checkCode) {
            return res.status(400).json({message: 'Code already exists'})
        }

        // Create new discount
        const discount = new Discounts({
            discount_code,
            discount_description,
            discount_percent,
            discount_max_uses,
            discount_start,
            discount_end,
            discount_status,
            discount_shopId,
            discount_productId
        })
        await discount.save()
        return res.status(201).json({message: 'Discount created'})
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}

exports.getAllDiscountsFromShop = async (req, res) => {
    try {
        const {shopId} = req.params
        // Get all discounts from shop
        const discounts = await Discounts.find({
            discount_shopId: shopId
        }, {
            select: '-discount_users_used -discount_shopId -createdAt -updatedAt -__v',
            sort: {createdAt: -1}
        })

        if(!discounts) {
            return res.status(400).json({message: 'No discounts found'})
        }
        return res.status(200).json(discounts)
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}

exports.getAllDiscountFromProduct = async (req, res) => {
    try {
        const {productId} = req.params
        // Get all discounts from product
        const discounts = await Discounts.find({
            discount_productId: productId
        }, {
            select: 'discount_code, discount_description discount_percent discount_max_uses discount_start discount_end',
            sort: {createdAt: -1}
        })

        if(!discounts) {
            return res.status(400).json({message: 'No discounts found'})
        }
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}

exports.updateDiscount = async (req, res) => {
    try {
        const id = req.params.id
        const discount_shopId = req.user._id
        const {discount_code, discount_description, discount_percent, discount_max_uses, discount_start, discount_end, discount_status, discount_productId} = req.body
        // Check required fields
        if(!discount_code || !discount_description || !discount_percent || !discount_max_uses || !discount_start || !discount_end || !discount_status || !discount_shopId || !discount_productId) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        if(new Date() < new Date(discount_start) || new Date() > new Date(discount_end)) {
            return res.status(400).json({message: 'Invalid date'})
        }

        // Check if that code is for that shop
        const checkCode = await Discounts.findOne({
            _id: id,
            discount_shopId
        }).lean()
        if(!checkCode) {
            return res.status(400).json({message: 'Access denied'})
        }

        // Update discount
        const discount = await Discounts.findByIdAndUpdate({
            _id: id
        }, {
            discount_description,
            discount_percent,
            discount_max_uses,
            discount_start,
            discount_end,
            discount_status,
            discount_productId
        })
        await discount.save()
        return res.status(200).json({message: 'Discount updated'})
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}

exports.deleteDiscount = async (req, res) => {
    try {
        const id = req.params.id
        const discount_shopId = req.user._id

        // Check if that code is for that shop
        const checkCode = await Discounts.findOne({
            _id: id,
            discount_shopId
        }).lean()
        if(!checkCode) {
            return res.status(400).json({message: 'Access denied'})
        }

        // Delete discount
        await Discounts.findOneAndDelete({
            discount_code,
            discount_shopId
        })
        return res.status(200).json({message: 'Discount deleted'})
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}