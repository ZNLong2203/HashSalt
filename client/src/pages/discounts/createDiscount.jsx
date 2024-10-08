import { useState, useEffect } from 'react';
import axios from 'axios';
import ROUTES from '../../routes/routes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';

const CreateDiscount = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [newDiscount, setNewDiscount] = useState({
        discount_code: '',
        discount_type: 'fixed',
        discount_value: 0,
        discount_description: '',
        discount_max_uses: 1,
        discount_start: moment().format('YYYY-MM-DD'),
        discount_end: moment().add(1, 'days').format('YYYY-MM-DD'),
        discount_productId: [], 
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${ROUTES.BE}/api/products/shop`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });

                if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.error('Products data is not an array:', response.data.products);
                    toast.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to fetch products');
            }
        };

        fetchProducts();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDiscount({
            ...newDiscount,
            [name]: value,
        });
    };

    const handleProductChange = (selectedOptions) => {
        const selectedProductIds = selectedOptions.map(option => option.value);
        setNewDiscount({
            ...newDiscount,
            discount_productId: selectedProductIds,
        });
    };

    const handleSaveClick = async () => {
        try {
            console.log('New Discount:', newDiscount);

            await axios.post(`${ROUTES.BE}/api/discounts`, { newDiscount }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            toast.success('Discount created successfully');
            setTimeout(() => {
                navigate(ROUTES.MYDISCOUNT);
            }, 1000);
        } catch (error) {
            console.error('Error creating discount:', error);
            toast.error('Failed to create discount');
        }
    };

    const productOptions = products.map(product => ({
        value: product._id,
        label: product.product_name,
    }));

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Create Discount</h1>
                <div className="space-y-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-700">Create New Discount</h2>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount Code:</label>
                        <input
                            type="text"
                            name="discount_code"
                            placeholder="Discount Code"
                            value={newDiscount.discount_code}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount Description:</label>
                        <input
                            type="text"
                            name="discount_description"
                            placeholder="Discount Description"
                            value={newDiscount.discount_description}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount Type:</label>
                        <select
                            name="discount_type"
                            value={newDiscount.discount_type}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        >
                            <option value="fixed">Fixed</option>
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount Value:</label>
                        <input
                            type="number"
                            name="discount_value"
                            placeholder="Discount Value"
                            value={newDiscount.discount_value}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount Max Uses:</label>
                        <input
                            type="number"
                            name="discount_max_uses"
                            placeholder="Max Uses"
                            value={newDiscount.discount_max_uses}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount Start Date:</label>
                        <input
                            type="date"
                            name="discount_start"
                            value={newDiscount.discount_start}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        />
                    </div>

                    <div className="flex flex-row items-center mb-2">
                        <label className="text-lg w-1/4 font-semibold mb-2 text-gray-700">Discount End Date:</label>
                        <input
                            type="date"
                            name="discount_end"
                            value={newDiscount.discount_end}
                            onChange={handleChange}
                            className="mb-2 w-3/4 p-2 border rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-700">Select Products</h3>
                        <Select
                            options={productOptions}
                            isMulti
                            value={productOptions.filter(option => newDiscount.discount_productId.includes(option.value))}
                            onChange={handleProductChange}
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: 'white',
                                    borderColor: state.isFocused ? '#2563EB' : '#E5E7EB',
                                    boxShadow: state.isFocused ? '0 0 0 2px rgba(37, 99, 235, 0.2)' : 'none',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected ? '#2563EB' : 'white',
                                    color: state.isSelected ? 'white' : 'black',
                                    '&:hover': {
                                        backgroundColor: state.isSelected ? '#2563EB' : '#E5E7EB',
                                        color: state.isSelected ? 'white' : 'black',
                                    },
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: 'white',
                                }),
                                multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: 'white',
                                    ':hover': {
                                        backgroundColor: '#2563EB',
                                        color: 'white',
                                    },
                                }),
                            }}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={handleSaveClick}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => navigate(ROUTES.MYDISCOUNT)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDiscount;
