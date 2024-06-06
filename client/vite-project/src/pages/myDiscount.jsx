import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { FaRegSmile } from 'react-icons/fa';
import { FiArrowRightCircle } from 'react-icons/fi';
import moment from 'moment';

const MyDiscounts = () => {
    const [discounts, setDiscounts] = useState([]);
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

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">My Discounts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discounts.map((discount) => (
                    <div key={discount._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-2">{discount.discount_code}</h2>
                        <p className="text-gray-700 mb-4">{discount.discount_description}</p>
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-lg font-bold text-blue-600">
                                {discount.discount_percent}% OFF
                            </div>
                            <div className="flex items-center space-x-2 text-gray-500">
                                <FaRegSmile />
                                <span>Max Uses: {discount.discount_max_uses}</span>
                            </div>
                        </div>
                        <div className="text-gray-500 mb-4">
                            Valid from: {moment(discount.discount_start).format('MMM DD, YYYY')} to {moment(discount.discount_end).format('MMM DD, YYYY')}
                        </div>
                        <div className="mt-4">
                            <button
                                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-transform transform hover:scale-105 ${
                                    new Date(discount.discount_end) < new Date() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
                                }`}
                                disabled={new Date(discount.discount_end) < new Date()}
                            >
                                {new Date(discount.discount_end) < new Date() ? 'Expired' : 'Use Discount'}
                                <FiArrowRightCircle className="ml-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyDiscounts;
