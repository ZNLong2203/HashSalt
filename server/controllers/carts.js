const User = require('../models/user');
const Carts = require('../models/carts');
const { Products } = require('../models/products');

exports.addCart = async (req, res, next) => {
    try {
        const { cart_product, cart_quantity } = req.body; 
        const userId = req.user._id;
        
        // Check cart existence (efficiently using findOneAndUpdate)
        const cart = await Carts.findOneAndUpdate(
            { cart_userId: userId, cart_status: 'active' },
            { $setOnInsert: { cart_userId: userId, cart_items: [] } },
            { upsert: true, new: true }
        );
    
        // Find existing product in cart (using cart_product)
        const existingItemIndex = cart.cart_items.findIndex(
            item => item.cart_product.toString() === cart_product
        );
    
        if (existingItemIndex >= 0) {
            cart.cart_items[existingItemIndex].cart_quantity += cart_quantity;
        } else {
            cart.cart_items.push({ cart_product, cart_quantity }); 
        }
    
        await cart.save();
    
        return res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message || 'Something went wrong' });
    }
};
