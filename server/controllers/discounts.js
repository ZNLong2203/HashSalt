const User = require('../models/user')
const {Products} = require('../models/products')
const Discounts = require('../models/discounts')

exports.createDiscount = async (req, res) => {
    try {
        const {discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_status, discount_shopId, discount_productId} = req.body
        // Check required fields
        if(!discount_code || !discount_type || !discount_description || !discount_value || !discount_max_uses || !discount_start || !discount_end || !discount_status || !discount_shopId || !discount_productId) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        if(new Date(discount_end) < new Date(discount_start) || new Date() > new Date(discount_end)) {
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
            discount_type,
            discount_description,
            discount_value,
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
        })
        .select('-discount_users_used -discount_shopId -createdAt -updatedAt -__v')
        .sort({ createdAt: -1 });

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
        })
        .select('-discount_users_used -discount_shopId -createdAt -updatedAt -__v')
        .sort({ createdAt: -1 })

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
        const {discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_status,  discount_productId} = req.body
        // Check required fields
        if(!discount_code || !discount_type || !discount_description || !discount_value || !discount_max_uses || !discount_start || !discount_end || !discount_status || !discount_shopId || !discount_productId) {
            return res.status(400).json({message: 'Please fill in all fields'})
        }
        if(new Date(discount_end) < new Date(discount_start) || new Date() > new Date(discount_end)) {
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
            discount_type,
            discount_value,
            discount_description,   
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

exports.useDiscount = async (req, res, next) => {
    try {
        const {discount_code, productId} = req.body
        const user = req.user
        
        // Check code
        const discount = await Discounts.findOne({
            discount_code,
            discount_productId: productId
        })
        if(!discount || discount.discount_status === false) {
            return res.status(400).json({message: 'Invalid code'})
        }
        if(discount.discount_uses_count >= discount.discount_max_uses) {
            return res.status(400).json({message: 'Code has reached its limit'})
        }
        if(new Date() > new Date(discount.discount_end)) {
            discount.discount_status = false
            await discount.save()
            return res.status(400).json({message: 'Code is expired'})
        }
        // Check if user already used that code
        const checkUser = discount.discount_users_used.includes(user._id)
        if(checkUser) {
            return res.status(400).json({message: 'Code already used'})
        }
        
        // Update discount
        discount.discount_uses_count += 1
        if(discount.discount_uses_count >= discount.discount_max_uses) {
            discount.discount_status = false
        }
        discount.discount_users_used.push(user._id)
        await discount.save()
        
        // Return discount and total after discount
        const product = await Products.findById(productId).lean()

        let AfterDiscount = 0
        if(discount.discount_type === 'fixed') {
            AfterDiscount = product.product_price - discount.discount_value
        } else {
            AfterDiscount = product.product_price - product.product_price * discount.discount_value / 100
        }
        return res.status(200).json({
            Price: product.product_price,
            Discount: discount.discount_value, 
            Type: discount.discount_type,
            AfterDiscount
        })
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong '})
    }
}

exports.cancelUseDiscount = async (req, res, next) => {
    try {
        const {discount_code, productId} = req.body
        const user = req.user

        // Check code
        const discount = await Discounts.findOne({
            discount_code,
            discount_productId: productId
        })
        if(!discount || discount.discount_status === false) {
            return res.status(400).json({message: 'Invalid code'})
        }

        // Update discount
        discount.discount_uses_count -= 1
        if(discount.discount_uses_count < discount.discount_max_uses) {
            discount.discount_status = true
        } else {
            discount.discount_status = false
        }
        await Discounts.findOneAndUpdate(
            {_id: discount._id},
            {$pull: {discount_users_used: user._id}}
        )
        await discount.save()
        return res.status(200).json({message: 'Discount canceled'})
    } catch(err) {
        return res.status(err.status || 400).json({message: err.message || 'Something went wrong'})
    }
}