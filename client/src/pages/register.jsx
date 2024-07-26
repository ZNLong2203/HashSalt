import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes.js';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password does not match');
            return;
        } else if (name === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields');
            return;
        }
        try {
            const res = await axios.post(`${ROUTES.BE}/auth/signup`, {
                name,
                email,
                password,
            });
            if (res.status === 200) {
                toast.success("Registration successful");
                navigate(ROUTES.LOGIN);
            }
        } catch (err) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen bg-gray-50">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="bg-white px-10 py-16 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-center">Create an Account</h1>
                    <p className="text-lg text-center text-gray-600 mt-4">Create an account to get started</p>
                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700">Name</label>
                            <input
                                className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                                type="text"
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700">Email</label>
                            <input
                                className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700">Password</label>
                            <input
                                className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
                            <input
                                className="border border-gray-300 rounded-lg p-2 w-full mt-1"
                                type="password"
                                placeholder="Confirm your password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="bg-violet-500 text-white w-full py-3 rounded-lg hover:bg-violet-600 transition duration-200">Register</button>
                    </form>
                    <p className="mt-6 text-center">Already have an account? <button className="text-violet-500 hover:text-violet-600 bg-white" onClick={() => navigate(ROUTES.LOGIN)}>Login</button></p>
                </div>
            </div>
            <div className="hidden lg:flex w-1/4 h-full items-center justify-center bg-slate-700">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
};

export default Register;
