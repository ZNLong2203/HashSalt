const mongoose = require('mongoose');
const {Schema, model, Types} = mongoose;

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_quantity: {
        type: Number,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothings', 'Furnitures']
    },
    product_shop: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true,
    }
}, {
    timestamps: true
})

// Electronics schema
const electronicsSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

// Clothing schema
const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

// Furniture schema
const furnitureSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }, 
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = {
    Products: model('Products', productSchema),
    Electronics: model('Electronics', electronicsSchema),
    Clothings: model('Clothings', clothingSchema),
    Furnitures: model('Furnitures', furnitureSchema)
}