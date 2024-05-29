const {Product, Electronics, Clothing, Furniture} = require('../models/product')
const ProductFactory = require('../services/product')

exports.createProduct = async (req, res, next) => {
    try {
        const productFactory = new ProductFactory({
            ...req.body,
            product_shop: req.user._id
        })
        const newProduct = await productFactory.createProduct()
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}