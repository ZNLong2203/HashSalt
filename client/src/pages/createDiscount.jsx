import { useState } from 'react';
import axios from 'axios';
import ROUTES from '../routes/routes';
import toast from 'react-hot-toast';
import useRefreshAccess  from '../hooks/useRefreshAccess';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import moment from 'moment';

const CreateDiscount = () => {
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
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDiscount({
            ...newDiscount,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken._id;
            await axios.post(`http://localhost:3000/api/discounts`, {
                ...newDiscount,
                discount_shopId: userId
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            toast.success('Discount created successfully');
            navigate(ROUTES.MYDISCOUNT);
        } catch (error) {
            toast.error('Failed to create discount');
            if(error.response.status === 401) {
                // await useRefreshAccess();
                // await handleSaveClick();
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Create Discount</h1>
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Create New Discount</h2>
                <div className="flex flex-row items-center mb-2">
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount Code:</label>
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
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount Description:</label>
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
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount Type:</label>
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
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount Value:</label>
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
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount Max Uses:</label>
                    <input
                    type="number"
                    name='discount_max_uses'
                    placeholder="Max Uses"
                    value={newDiscount.discount_max_uses}
                    onChange={handleChange}
                    className="mb-2 w-3/4 p-2 border rounded"
                    />
                </div>

                <div className="flex flex-row items-center mb-2">
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount Start Date:</label>
                    <input 
                    type="date"
                    name="discount_start"
                    value={newDiscount.discount_start}
                    onChange={handleChange}
                    className="mb-2 w-3/4 p-2 border rounded"
                    />
                </div>

                <div className="flex flex-row items-center mb-2">
                    <label className="text-lg w-1/4 font-semibold mb-2">Discount End Date:</label>
                    <input
                    type="date"
                    name="discount_end"
                    value={newDiscount.discount_end}
                    onChange={handleChange}
                    className="mb-2 w-3/4 p-2 border rounded"
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
    );
};

export default CreateDiscount;
