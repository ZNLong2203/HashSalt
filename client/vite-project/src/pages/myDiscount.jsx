import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ROUTES from '../routes/routes';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import, it's a default export
import { FaRegSmile } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MyDiscounts = () => {
    const [discounts, setDiscounts] = useState([]);
    const [isEditing, setIsEditing] = useState(null); // Track the discount being edited
    const [editDiscount, setEditDiscount] = useState({}); // Store the edited discount values
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken._id;
                const response = await axios.get(`http://localhost:3000/api/discounts/shop/${userId}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
                setDiscounts(response.data);
            } catch (error) {
                console.error('Error fetching discounts or decoding token:', error);
            }
        };

        fetchDiscounts();
    }, [token]);

    const handleEditClick = (discount) => {
        setIsEditing(discount._id);
        setEditDiscount(discount);
    };

    const handleDeleteClick = async (discountId) => {
        try {
            await axios.delete(`http://localhost:3000/api/discounts/${discountId}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            setDiscounts(discounts.filter((discount) => discount._id !== discountId));
        } catch (error) {
            console.error('Error deleting discount:', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            await axios.put(`http://localhost:3000/api/discounts/${editDiscount._id}`, editDiscount, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            setDiscounts(discounts.map((discount) => discount._id === editDiscount._id ? editDiscount : discount));
            setIsEditing(null);
        } catch (error) {
            console.error('Error saving discount:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDiscount({
            ...editDiscount,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">My Discounts</h1>
            <Link
                to={ROUTES.CREATEDISCOUNT}
                className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Create Discount
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {discounts.map((discount) => (
                    <div key={discount._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        {isEditing === discount._id ? (
                            <div>
                                <input
                                    type="text"
                                    name="discount_code"
                                    value={editDiscount.discount_code}
                                    onChange={handleChange}
                                    className="mb-2 w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="discount_description"
                                    value={editDiscount.discount_description}
                                    onChange={handleChange}
                                    className="mb-2 w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="discount_value"
                                    value={editDiscount.discount_value}
                                    onChange={handleChange}
                                    className="mb-2 w-full p-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name='discount_max_uses'
                                    value={editDiscount.discount_max_uses}
                                    onChange={handleChange}
                                    className="mb-2 w-full p-2 border rounded"
                                />
                                <input 
                                    type="date"
                                    name="discount_start"
                                    value={moment(editDiscount.discount_start).format('YYYY-MM-DD')}
                                    onChange={handleChange}
                                    className="mb-2 w-full p-2 border rounded"
                                />
                                <input
                                    type="date"
                                    name="discount_end"
                                    value={moment(editDiscount.discount_end).format('YYYY-MM-DD')}
                                    onChange={handleChange}
                                    className="mb-2 w-full p-2 border rounded"
                                />
                                <div className="flex justify-between">
                                    <button
                                        onClick={handleSaveClick}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(null)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">{discount.discount_code}</h2>
                                <p className="text-gray-700 mb-4">{discount.discount_description}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-lg font-bold text-blue-600">
                                        {discount.discount_type === "percentage"
                                            ? `${discount.discount_value}% OFF`
                                            : `$${discount.discount_value} OFF`}
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <FaRegSmile />
                                        <span>Max Uses: {discount.discount_max_uses}</span>
                                    </div>
                                </div>
                                <div className="text-gray-500 mb-4">
                                    Valid from: {moment(discount.discount_start).format('MMM DD, YYYY')} to {moment(discount.discount_end).format('MMM DD, YYYY')}
                                </div>
                                <div className="flex justify-center space-x-20 mt-4">
                                    <button
                                        onClick={() => handleEditClick(discount)}
                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(discount._id)}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDiscounts;
