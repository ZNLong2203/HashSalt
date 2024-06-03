const mongoose = require('mongoose')
const {Products, Electronics, Clothings, Furnitures} = require('../models/products')
const {removeUndefined} = require('../utils/getInfo')

// Define factory class for product
class ProductFactory {
    constructor(product) {
        this.product = product
    }

    async createProduct() {
        // Generate a new id for the product and assign it to the id sub_document too
        const newId = new mongoose.Types.ObjectId()
        this.product._id = newId

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

    async updateProduct() {
        switch(this.product.product_type) {
            case 'Electronics':
                return await new Electronics_Class(this.product).updateProduct()
            case 'Clothings':
                return await new Clothings_Class(this.product).updateProduct()
            case 'Furnitures':
                return await new Furnitures_Class(this.product).updateProduct()
            default:
                throw new Error('Invalid product type')
        }
    }

    async deleteProduct() {
        switch(this.product.product_type) {
            case 'Electronics':
                return await new Electronics_Class(this.product).deleteProduct()
            case 'Clothings':
                return await new Clothings_Class(this.product).deleteProduct()
            case 'Furnitures':
                return await new Furnitures_Class(this.product).deleteProduct()
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

    async updateProduct() {
        try {
            const updatedProduct = await Products.findByIdAndUpdate(this.product._id, removeUndefined(this.product), {
                new: true
            })
            return updatedProduct
        } catch(err) {
            throw new Error(err)
        }
    }

    async deleteProduct() {
        try {
            const deletedProduct = await Products.findByIdAndDelete(this.product._id)
            return deletedProduct
        } catch(err) {
            throw new Error(err)
        }
    }
}

// Define child class for electronics
class Electronics_Class extends Products_Class {
    async createProduct() {
        try {
            const newElectronics = new Electronics({
                ...this.product.product_attributes,
                _id: this.product._id
            })
            await newElectronics.save()
            
            const newProduct = await super.createProduct()
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateProduct() {
        try {
            const updatedElectronics = await Electronics.findByIdAndUpdate(this.product._id, removeUndefined(this.product.product_attributes), {
                new: true
            })
            await updatedElectronics.save()

            const updatedProduct = await super.updateProduct()
            return updatedProduct
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteProduct() {
        try {
            const deletedElectronics = await Electronics.findByIdAndDelete(this.product._id)
            await super.deleteProduct()
            return deletedElectronics
        } catch(err) {
            throw new Error(err)
        }
    }
}

// Define child class for clothing
class Clothings_Class extends Products_Class {
    async createProduct() {
        try {
            const newClothing = new Clothings({
                ...this.product.product_attributes,
                _id: this.product._id
            })
            await newClothing.save()

            const newProduct = await super.createProduct()
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateProduct() {
        try {
            const updatedClothing = await Clothings.findByIdAndUpdate(this.product._id, removeUndefined(this.product.product_attributes), {
                new: true
            })
            await updatedClothing.save()

            const updatedProduct = await super.updateProduct()
            return updatedProduct
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteProduct() {
        try {
            const deletedClothing = await Clothings.findByIdAndDelete(this.product._id)
            await super.deleteProduct()
            return deletedClothing
        } catch(err) {
            throw new Error(err)
        }
    }
}

// Define child class for furniture
class Furnitures_Class extends Products_Class {
    async createProduct() {
        try {
            const newFurniture = new Furnitures({
                ...this.product.product_attributes,
                _id: this.product._id
            })
            await newFurniture.save()

            const newProduct = await super.createProduct()
            return newProduct
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateProduct() {
        try {
            const updatedFurniture = await Furnitures.findByIdAndUpdate(this.product._id, removeUndefined(this.product.product_attributes), {
                new: true
            })
            await updatedFurniture.save()

            const updatedProduct = await super.updateProduct()
            return updatedProduct
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteProduct() {
        try {
            const deletedFurniture = await Furnitures.findByIdAndDelete(this.product._id)
            await super.deleteProduct()
            return deletedFurniture
        } catch(err) {
            throw new Error(err)
        }
    }
}

module.exports = ProductFactory