const {Product, Electronics, Clothing, Furniture} = require('../models/product')
const ProductFactory = require('../services/product')

exports.createProduct = async (req, res, next) => {
    try {
        const productFactory = new ProductFactory(req.body)
        const newProduct = await productFactory.createProduct()
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}