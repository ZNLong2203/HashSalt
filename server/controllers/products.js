const { createCipheriv } = require('crypto')
const {Products, Electronics, Clothing, Furniture} = require('../models/products')
const ProductFactory = require('../services/products')

// User creates a product
exports.createProduct = async (req, res, next) => {
    try {
        const productFactory = new ProductFactory({
            ...req.body,
            product_shop: req.user._id
        })
        const newProduct = await productFactory.createProduct()
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(err.status || 500).json({message: err.message})
    }
}

// Get all products from the shop of that user
exports.getProductShop = async (req, res, next) => {
    try {
        console.log(req.user._id)
        const products =  await Products.find({product_shop: req.user._id})
        res.status(200).json(products)
    } catch(err) {
        res.status(err.status || 500).json({message: err.message})
    }
}

// Get all products when people type in search bar, query is the name of the product 
// Using text index to search for products, only return products that are published
exports.searchProduct = async (req, res, next) => {
    try {
        const products = await Products.find({
            $text: {$search: req.query.name},
            isPublished: true
        }, {score: {$meta: "textScore"}})
        .sort({score: {$meta: "textScore"}})
        .limit(20)
        .lean()
        res.status(200).json(products)
    } catch(err) {
        res.status(err.status || 500).json({message: err.message})
    }
}

// Publish a product
exports.publishedProduct = async (req, res, next) => {
    try {
        const product = await Products.findByIdAndUpdate(
            req.params.id,
            {isPublished: true},
            {new: true}
        )
        if(!product) {
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json(product)
    } catch(err) {
        res.status(err.status || 500).json({message: err.message})
    }
}

// Unpublish a product
exports.unpublishedProduct = async (req, res, next) => {
    try {
        const product = await Products.findByIdAndUpdate(
            req.params.id,
            {isPublished: false},
            {new: true}
        )
        if(!product) {
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json(product)
    } catch(err) {
        res.status(err.status || 500).json({message: err.message})
    }
}