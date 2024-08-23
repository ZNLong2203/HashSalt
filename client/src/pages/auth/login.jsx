import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routes';
import useStoreToken from '../../hooks/useStoreToken';
import ForgotPasswordModal from '../../components/forgotPasswordModal';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setAuthenticated, setRole } = useStoreToken();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            toast.error('Please fill in all fields');
            return;
        }
        try {
            const res = await axios.post(`${ROUTES.BE}/auth/login`, {
                email,
                password,
            });
            if (res.status === 200) {
                toast.success('Login successful');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('token-storage');
                localStorage.removeItem('expired');
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('expired', res.data.expired);
                setRole(res.data.role);
                setAuthenticated(true);
                navigate(ROUTES.HOME);
            }
        } catch (err) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full h-screen bg-gray-50">
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="bg-white px-10 py-16 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-4xl font-bold text-center">Welcome Back</h1>
                    <p className="text-lg text-center text-gray-600 mt-4">Please enter your details</p>
                    <form onSubmit={handleSubmit} className="mt-8">
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
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-gray-700" htmlFor="remember">Remember me</label>
                            </div>
                            <button
                                type="button"
                                onClick={openModal}
                                className="text-violet-500 hover:text-violet-600 bg-white"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <button className="bg-violet-500 text-white w-full py-3 rounded-lg hover:bg-violet-600 transition duration-200">Login</button>
                    </form>
                    <button
                        className="bg-gray-200 text-gray-700 w-full py-3 mt-4 rounded-lg hover:bg-gray-300 transition duration-200"
                        onClick={() => window.location.href = `${ROUTES.BE}/auth/google`}
                    >
                        Login with Google
                    </button>
                    <p className="mt-6 text-center">Don't have an account? <button className="text-violet-500 hover:text-violet-600 bg-white" onClick={() => navigate(ROUTES.REGISTER)}>Sign up</button></p>
                </div>
                <ForgotPasswordModal isOpen={isModalOpen} onRequestClose={closeModal} />
            </div>
            <div className="hidden lg:flex w-1/4 h-full items-center justify-center bg-slate-700">
                <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
};

export default Login;
