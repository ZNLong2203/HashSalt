const {Products, Electronics, Clothings, Furnitures} = require('../models/products')

// Define factory class for product
class ProductFactory {
    constructor(product) {
        this.product = product
    }

    async createProduct() {
        switch(this.product.product_type) {
            case 'Electronics':
                return await new Electronics_Class(this.product).createProduct()
            case 'Clothings':
                return await new Clothings_Class(this.product).createProduct()
            case 'Furnitures':
                return await new Furnitures_Class(this.product).createProduct()
            default:
                throw new Error('Invalid product type')
        }
    }
}

// Define base class for product
class Products_Class {
    constructor(product) {
        this.product = product
    }

    async createProduct() {
        try {
            const product = new Products(this.product)
            await product.save()
            return product
        } catch(err) {
            throw new Error(err)
        }
    }
}

// Define child class for electronics
class Electronics_Class extends Products_Class {
    async createProduct() {
        try {
            const newElectronics = new Electronics(this.product.product_attributes)
            await newElectronics.save()
            
            const newProduct = await super.createProduct()
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }
}

// Define child class for clothing
class Clothings_Class extends Products_Class {
    async createProduct() {
        try {
            const newClothing = new Clothings(this.product.product_attributes)
            await newClothing.save()

            const newProduct = await super.createProduct()
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }
}

// Define child class for furniture
class Furnitures_Class extends Products_Class {
    async createProduct() {
        try {
            const newFurniture = new Furnitures(this.product.product_attributes)
            await newFurniture.save()

            const newProduct = await super.createProduct()
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = ProductFactory