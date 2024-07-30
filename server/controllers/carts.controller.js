const CartService = require('../services/carts.service');

exports.getListInCart = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const cart = await CartService.getListInCart(userId);

        return res.status(200).json({
            message: 'Cart items fetched successfully',
            metadata: cart
        })
    } catch(err) {
        next(err);
    }
}

exports.addCart = async (req, res, next) => {
    try {
        const { cart_product, cart_quantity } = req.body; 
        const userId = req.user._id;
        
        const cart = await CartService.addCart(cart_product, cart_quantity, userId)
    
        return res.status(200).json({ 
            message: 'Product added to cart', 
            metadata: cart 
        });
    } catch(err) {
        next(err);
    }
};

exports.changeQuantityCart = async (req, res, next) => {
    try {
        const { cart_product, cart_quantity } = req.body;
        const userId = req.user._id;

        const cart = await CartService.changeQuantityCart(cart_product, cart_quantity, userId);

        return res.status(200).json({
            message: 'Cart updated successfully',
            metadata: cart
        })
    } catch(err) {
        next(err);
    }
}

exports.deleteOneItem = async (req, res, next) => {
    try {
        const { cart_product } = req.body;
        const userId = req.user._id;
        const cart = await CartService.deleteOneItem(cart_product, userId);

        return res.status(200).json({
            message: 'Item deleted successfully',
            metadata: cart
        })
     } catch(err) {
        next(err);
    }
}

exports.deleteAllItem = async (req, res, next) => {
    try {
        const userId = req.user._id;

        await CartService.deleteAllItem(userId);

        return res.status(200).json({
            message: 'Cart deleted successfully'
        })
    } catch(err) {
        next(err);
    }
}
