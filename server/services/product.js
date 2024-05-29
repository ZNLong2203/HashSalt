const {Products, Electronics, Clothings, Furnitures} = require('../models/product')

// Define factory class for product
class ProductFactory {
    constructor(product) {
        this.product = product
    }

    createProduct() {
        switch(this.product.product_type) {
            case 'Electronics':
                return new Electronics_Class(this.product)
            case 'Clothings':
                return new Clothing_Class(this.product)
            case 'Furnitures':
                return new Furniture_Class(this.product)
            default:
                throw new Error('Invalid product type')
        }
    }
}

// Define base class for product
class Product_Class {
    constructor({product_name, product_image, product_description, product_price, product_quantity, product_type, product_shop, product_attributes}) {
        this.product_name = product_name
        this.product_image = product_image
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct() {
        try {
            const product = new Products(this)
            await product.save()
            return product
        } catch(err) {
            throw new Error(err)
        }
    }
}

// Define child class for electronics
class Electronics_Class extends Product_Class {
    async createProduct() {
        try {
            const newElectronics = new Electronics(this.product_attributes)
            await newElectronics.save()
            
            const newProduct = await super.createProduct(this)
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }
}

// Define child class for clothing
class Clothing_Class extends Product_Class {
    async createProduct() {
        try {
            const newClothing = new Clothings(this.product_attributes)
            await newClothing.save()

            const newProduct = await super.createProduct(this)
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }
}

// Define child class for furniture
class Furniture_Class extends Product_Class {
    async createProduct() {
        try {
            const newFurniture = new Furnitures(this.product_attributes)
            await newFurniture.save()

            const newProduct = await super.createProduct(this)
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = ProductFactory