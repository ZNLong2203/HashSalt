import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        product_name: '',
        product_image: null,
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
        if (name === 'product_type') {
            // Clear irrelevant attributes when product_type changes
            const defaultAttributes = getDefaultAttributes(value);
            setProduct((prevState) => ({
                ...prevState,
                product_type: value,
                product_attributes: defaultAttributes
            }));
        } else {
            setProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e) => {
        setProduct((prevState) => ({
            ...prevState,
            product_image: e.target.files[0],
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

    const getDefaultAttributes = (productType) => {
        switch (productType) {
            case 'Electronics':
                return { brand: '', model: '', color: '' };
            case 'Clothings':
                return { brand: '', size: '', color: '', material: '' };
            case 'Furnitures':
                return { brand: '', material: '', color: '', width: '', height: '', depth: '' };
            default:
                return {};
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const attribute = new FormData();
        formData.append('product_name', product.product_name);
        formData.append('product_image', product.product_image);
        formData.append('product_description', product.product_description);
        formData.append('product_price', product.product_price);
        formData.append('product_quantity', product.product_quantity);
        formData.append('product_type', product.product_type);

        // Append relevant product_attributes based on product_type
        const attributes = product.product_attributes;
        if (product.product_type === 'Electronics') {
            attribute.append('brand', attributes.brand);
            attribute.append('model', attributes.model);
            attribute.append('color', attributes.color);
        } else if (product.product_type === 'Clothings') {
            attribute.append('brand', attributes.brand);
            attribute.append('size', attributes.size);
            attribute.append('color', attributes.color);
            attribute.append('material', attributes.material);
        } else if (product.product_type === 'Furnitures') {
            attribute.append('brand', attributes.brand);
            attribute.append('material', attributes.material);
            attribute.append('color', attributes.color);
            attribute.append('width', attributes.width);
            attribute.append('height', attributes.height);
            attribute.append('depth', attributes.depth);
        }
        formData.append('product_attributes', JSON.stringify(Object.fromEntries(attribute)));

        try {
            const response = await axios.post('http://localhost:3000/api/products', formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status !== 201) {
                throw new Error(response.data.message);
            }
            toast.success("Product Created Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Create Product Error:", error.message);
        }
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
                                onChange={handleFileChange}
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
                            <div>
                                <label className="block text-sm font-medium">Depth</label>
                                <input
                                    type="number"
                                    name="depth"
                                    value={product.product_attributes.depth}
                                    onChange={handleAttributeChange}
                                    className="px-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm text-black"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
