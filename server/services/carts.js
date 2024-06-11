const User = require('../models/user');
const Carts = require('../models/carts');
const {Products} = require('../models/products');

class CartService {
    async getListInCart(userId) {
        try {
            console.log(userId);
            const cart = await Carts.findOne({
                cart_userId: userId,
                cart_status: 'active'
            }).populate('cart_items.cart_product');

            return cart;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async addCart(cart_product, cart_quantity, userId) {
        try {
            // Check cart existence (efficiently using findOneAndUpdate)
            const cart = await Carts.findOneAndUpdate(
                {cart_userId: userId, cart_status: 'active'},
                {$setOnInsert: {cart_userId: userId, cart_items: []}},
                {upsert: true, new: true}
            );

            // Find existing product in cart (using cart_product)
            const existingItemIndex = cart.cart_items.findIndex(
                item => item.cart_product.toString() === cart_product
            );

            if (existingItemIndex >= 0) {
                cart.cart_items[existingItemIndex].cart_quantity += cart_quantity;
            } else {
                cart.cart_items.push({cart_product, cart_quantity});
            }

            await cart.save();

            return cart;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async changeQuantityCart(cart_product, cart_quantity, userId) {
        try {
            const cart = await Carts.findOne({
                cart_userId: userId,
                cart_status: 'active'
            })
            if(!cart) {
                throw new Error('Cart not found');
            }

            const existingItemIndex = cart.cart_items.findIndex(
                item => item.cart_product.toString() === cart_product
            )
            
            cart.cart_items[existingItemIndex].cart_quantity = cart_quantity;
            await cart.save();

            return cart;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async deleteOneItem(cart_product, userId) {
        try {
            const cart = await Carts.findOneAndUpdate(
                { cart_userId: userId, cart_status: 'active' }, 
                { $pull: {cart_items: {cart_product: cart_product}}},
                { new: true}
            )

            if(!cart) {
                throw new Error('No active card found for this user')
            }
            return cart;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async deleteAllItem(userId) {
        try {
            const cart = await Carts.findOneAndDelete({
                cart_userId: userId,
                cart_status: 'active',
            })

            return cart;
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }
}

module.exports = new CartService();