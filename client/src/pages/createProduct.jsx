import axios from 'axios';
import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_name: '',
        product_image: '',
        product_description: '',
        product_price: 0,
        product_quantity: 0,
        product_type: 'Electronics',
        product_attributes: {
        brand: '',
        model: '',
        color: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleAttributeChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
        ...prevState,
        product_attributes: {
            ...prevState.product_attributes,
            [name]: value,
        },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        // Handle form submission
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-custom-gradient text-white p-4">
        <div className="max-w-2xl w-full bg-gray-600 bg-opacity-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Product Image</label>
                <div className="mt-1 flex items-center">
                <input
                    type="file"
                    name="product_image"
                    onChange={handleChange}
                    className="hidden"
                    id="product_image"
                />
                <label htmlFor="product_image" className="cursor-pointer">
                    <FiUpload className="text-3xl" />
                </label>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">Product Description</label>
                <textarea
                name="product_description"
                value={product.product_description}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium">Product Price</label>
                <input
                type="number"
                name="product_price"
                value={product.product_price}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Product Quantity</label>
                <input
                type="number"
                name="product_quantity"
                value={product.product_quantity}
                onChange={handleChange}
                className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Product Type</label>
                <select
                name="product_type"
                value={product.product_type}
                onChange={handleChange}
                className="px-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                >
                <option value="Electronics">Electronics</option>
                <option value="Clothings">Clothings</option>
                <option value="Furnitures">Furnitures</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Brand</label>
                <input
                type="text"
                name="brand"
                value={product.product_attributes.brand}
                onChange={handleAttributeChange}
                className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
            </div>
            {product.product_type === 'Electronics' && (
                <div>
                <label className="block text-sm font-medium">Model</label>
                <input
                    type="text"
                    name="model"
                    value={product.product_attributes.model}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
                <label className="block text-sm font-medium">Color</label>
                <input
                    type="text"
                    name="color"
                    value={product.product_attributes.color}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                />
                </div>
            )}
            {product.product_type === 'Clothings' && (
                <>
                <div>
                    <label className="block text-sm font-medium">Size</label>
                    <input
                    type="text"
                    name="size"
                    value={product.product_attributes.size}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Color</label>
                    <input
                    type="text"
                    name="color"
                    value={product.product_attributes.color}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Material</label>
                    <input
                    type="text"
                    name="material"
                    value={product.product_attributes.material}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                </>
            )}
            {product.product_type === 'Furnitures' && (
                <>
                <div>
                    <label className="block text-sm font-medium">Material</label>
                    <input
                    type="text"
                    name="material"
                    value={product.product_attributes.material}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Color</label>
                    <input
                    type="text"
                    name="color"
                    value={product.product_attributes.color}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Width</label>
                    <input
                    type="number"
                    name="width"
                    value={product.product_attributes.width}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input
                    type="number"
                    name="height"
                    value={product.product_attributes.height}
                    onChange={handleAttributeChange}
                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                    />
                </div>
                </>
            )}
            <div className="flex justify-end space-x-6">
                <button
                type="submit"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                Create Product
                </button>
                <button
                onClick={() => navigate(ROUTES.MYSHOP)}
                type="submit"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                Cancel
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default CreateProduct;
