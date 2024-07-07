const { createCipheriv } = require('crypto')
const User = require('../models/user')
const {Products, Electronics, Clothing, Furniture} = require('../models/products')
const ProductFactory = require('../services/products')

// Get all products to display on the home page
exports.getAllProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 12;
        const skip = (page - 1) * limit

        const totalDocs = await Products.countDocuments({isPublished: true})
        const totalPages = Math.ceil(totalDocs / limit)

        const products = await Products
                        .find({isPublished: true})
                        .select('product_name product_image product_description product_price product_quantity product_shop')
                        .skip(skip)
                        .limit(limit)
        res.status(200).json({
            products,
            page,
            totalPages
        })
    } catch(err) {
        next(err);
    }
}

// Get a single product
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Products.findById(req.params.id)
        if(!product) {
            return res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json(product)
    } catch(err) {
        next(err);
    }
}

// User creates a product
exports.createProduct = async (req, res, next) => {
    try {
        // Handle product_attributes, which is an string, convert it to an object
        const productAttributes = JSON.parse(req.body.product_attributes);

        // Change product_image to file path in local
        const productFactory = new ProductFactory({
            ...req.body,
            product_shop: req.user._id,
            product_image: req.file.path,
            product_attributes: productAttributes
        })
        const newProduct = await productFactory.createProduct()
        res.status(201).json(newProduct)
    } catch(err) {
        next(err);
    }
}

// Get all products from the shop of that user
exports.getProductShop = async (req, res, next) => {
    try {
        const products =  await Products.find({product_shop: req.user._id})
        res.status(200).json(products)
    } catch(err) {
        next(err);
    }
}

exports.updatedProduct = async (req, res, next) => {
    try {
        // Check if the user is the owner of the product
        if(req.body.product_shop !== req.user._id) {
            return res.status(401).json({message: 'Access denied'})
        }

        const productFactory = new ProductFactory(req.body)
        const updatedProduct = await productFactory.updateProduct()
        res.status(200).json(updatedProduct)
    } catch(err) {
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        // Check if the user is the owner of the product
        const productId = req.params.id
        const product = await Products.findById(productId)
        if(product.product_shop.toString() !== req.user._id) {
            return res.status(401).json({message: 'Access denied'})
        }

        const productFactory = new ProductFactory(product)
        const deletedProduct = await productFactory.deleteProduct()
        res.status(200).json({
            message: 'Product deleted',
            metadata: deletedProduct
        })
    } catch(err) {
        next(err);
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
        next(err);
    }
}

exports.searchProductByCategory = async (req, res, next) => {
    try {
        const { type } = req.query
        const { page } = req.query || 1
        const limit = 12
        const skip = (page - 1) * limit

        // Get total number of documents and pages
        const totalDocs = await Products.countDocuments({
            product_type: type,
            isPublished: true
        })
        const totalPages = Math.ceil(totalDocs / limit)

        const products = await Products.find({
            product_type: type,
            isPublished: true
        })
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .lean()
        res.status(200).json({
            products,
            page,
            totalPages
        })
    } catch(err) {
        next(err);
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
        next(err);
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
        next(err);
    }
}