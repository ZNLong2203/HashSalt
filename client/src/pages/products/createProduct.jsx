import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';

const CreateProduct = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [uploadedFileName, setUploadedFileName] = useState('');

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
        if (e.target.files.length > 0) {
            setUploadedFileName(e.target.files[0].name);
        }
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
            await axios.post(`${ROUTES.BE}/api/products`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success("Product Created Successfully");
            setTimeout(() => {
                navigate(ROUTES.MYSHOP);
            }, 1000)
        } catch (error) {
            toast.error("Create Product Error:", error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8"> 
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Create New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            name="product_name"
                            value={product.product_name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            {uploadedFileName && <span className="ml-2">{uploadedFileName}</span>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Product Description</label>
                        <textarea
                            name="product_description"
                            value={product.product_description}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Product Price</label>
                        <input
                            type="number"
                            name="product_price"
                            value={product.product_price}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Product Quantity</label>
                        <input
                            type="number"
                            name="product_quantity"
                            value={product.product_quantity}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Product Type</label>
                        <select
                            name="product_type"
                            value={product.product_type}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Electronics">Electronics</option>
                            <option value="Clothings">Clothings</option>
                            <option value="Furnitures">Furnitures</option>
                        </select>
                    </div>
                    <div>
                        {Object.entries(product.product_attributes).map(([attribute, value]) => (
                            <div key={attribute} className="mb-2">
                            <label className="block text-sm font-medium text-gray-700">{attribute}</label>
                            <input
                                type="text" 
                                name={attribute}
                                value={value}
                                onChange={handleAttributeChange}
                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            </div>
                        ))}
                    </div>
                    <div className="flex space-x-20 justify-center">
                        <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                        Create Product
                        </button>
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(ROUTES.MYSHOP)}
                        >
                        Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
