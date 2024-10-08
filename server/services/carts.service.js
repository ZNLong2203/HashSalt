const User = require('../models/users.model');
const Carts = require('../models/carts.model');
const {Products} = require('../models/products.model');

class CartService {
    async getListInCart(userId) {
        try {
            const cart = await Carts.findOne({
                cart_userId: userId,
                cart_status: 'active'
            }).populate('cart_items.cart_product');

            if(!cart) {
                return {cart: null, totalPrice: 0};
            }
            
            // Caculate total price
            let totalPrice = 0;
            cart.cart_items.forEach(item => {
                totalPrice += item.cart_product.product_price * item.cart_quantity;
            })
            return {cart, totalPrice};
        } catch(err) {
            throw new Error(err.message || 'Something went wrong');
        }
    }

    async addCart(cart_product, cart_quantity, userId) {
        try {
            const cart = await Carts.findOneAndUpdate(
                {cart_userId: userId, cart_status: 'active'},
                {$setOnInsert: {cart_userId: userId, cart_items: []}},
                {upsert: true, new: true}
            );

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