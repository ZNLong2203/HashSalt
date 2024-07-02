const User = require('../models/user')
const {Products} = require('../models/products')
const Discounts = require('../models/discounts')
const Carts = require('../models/carts')

class DiscountService{
    async createDiscount(discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_shopId, discount_productId){
        try{
            // Check if all fields are filled
            if(!discount_code || !discount_type || !discount_description || !discount_value || !discount_max_uses || !discount_start || !discount_end || !discount_shopId || !discount_productId){
                throw new Error('Please fill in all fields')
            }
            // Check if discount data is valid
            if(new Date(discount_end) < new Date(discount_start) || new Date() > new Date(discount_end)){
                throw new Error('Invalid date')
            }
            // Check if code already exists
            const checkCode = await Discounts.findOne({
                discount_code,
                discount_shopId
            }).lean()
            if(checkCode){
                throw new Error('Code already exists')
            }
            const discount = new Discounts({
                discount_code,
                discount_type,
                discount_description,
                discount_value,
                discount_max_uses,
                discount_start,
                discount_end,
                discount_shopId,
                discount_productId
            })
            await discount.save()
            return discount
        } catch(err){
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async getAllDiscountsFromShop(shopId) {
        try {
            // Get all discounts from shop
            const discounts = await Discounts.find({
                discount_shopId: shopId
            })
            .select('-discount_users_used -discount_shopId -createdAt -updatedAt -__v')
            .sort({ createdAt: -1 });

            if(!discounts) {
                throw new Error('No discounts found')
            }
            return discounts
        } catch(err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async getAllDiscountFromProduct(productId) {
        try {
            // Get all discounts from product
            const discounts = await Discounts.find({
                discount_productId: productId
            })
            .select('-discount_users_used -discount_shopId -createdAt -updatedAt -__v')
            .sort({ createdAt: -1 })

            if(!discounts) {
                throw new Error('No discounts found')
            }
            return discounts
        } catch(err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async updateDiscount(id, discount_shopId, discount_code, discount_type, discount_description, discount_value, discount_max_uses, discount_start, discount_end, discount_status, discount_productId) {
        try{
            // Check required fields
            if(!discount_code || !discount_type || !discount_description || !discount_value || !discount_max_uses || !discount_start || !discount_end || !discount_status || !discount_shopId || !discount_productId) {
                throw new Error('Please fill in all fields')
            }
            if(new Date(discount_end) < new Date(discount_start) || new Date() > new Date(discount_end)) {
                throw new Error('Invalid date')
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
                discount_code,
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
        } catch(err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async deleteDiscount(id, discount_shopId) {
        try {
            // Check if that code is for that shop
            const checkCode = await Discounts.findOne({
                _id: id,
                discount_shopId
            }).lean()
            if(!checkCode) {
                return res.status(400).json({message: 'Access denied'})
            }

            // Delete discount
            await Discounts.findByIdAndDelete(id)
        } catch(err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async useDiscount(discount_code, productId, user) {
        try {
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
            
            // Update discount uses count and users used
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

            // Update cart_discount in cart
            await Carts.findOneAndUpdate({
                'cart_items.cart_product': productId,
                cart_userId: user._id
            }, {'cart_items.cart_discount': discount._id}, {new: true})

            return {
                Price: product.product_price,
                Discount: discount.discount_value, 
                Type: discount.discount_type,
                AfterDiscount
            }
        } catch(err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }

    async cancelUseDiscount(discount_code, productId, user) {
        try {
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

            // Update cart_discount in cart 
            await Carts.findOneAndUpdate({
                'cart_items.cart_product': productId,
                cart_userId: user._id
            }, {'cart_items.cart_discount': null}, {new: true})
        } catch(err) {
            throw new Error(err.message || 'Something went wrong')
        }
    }
}

module.exports = new DiscountService()