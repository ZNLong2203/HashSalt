import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";
import ROUTES from '../routes/routes';

Modal.setAppElement('#root'); 

const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleSendOtp = async () => {
        try {
            await axios.post(`${ROUTES.BE}/auth/password/forgot`, { email });
            toast.success('OTP sent to your email');
            setOtpSent(true);
        } catch (err) {
            toast.error('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            await axios.post(`${ROUTES.BE}/auth/password/otp`, { email, otp });
            toast.success('OTP verified successfully');
            setIsVerified(true);
        } catch (err) {
            toast.error('Failed to verify OTP');
        }
    };

    const handleResetPassword = async () => {
        try {
            await axios.post(`${ROUTES.BE}/auth/password/change`, { email, password });
            toast.success('Password reset successfully');
            onRequestClose(); // Close the modal after password reset
        } catch (err) {
            toast.error('Failed to reset password');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Forgot Password"
            className="flex justify-center items-center w-full h-full bg-black bg-opacity-50 fixed inset-0"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className='flex'>       
                    <h2 className="text-2xl font-bold">Forgot Password</h2>
                    <IoClose className='ml-auto mt-2 text-xl' onClick={onRequestClose} />
                </div>
                {!otpSent ? (
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full mt-4"
                        />
                        <button
                            onClick={handleSendOtp}
                            className="bg-violet-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                        >
                            Send OTP
                        </button>
                    </div>
                ) : (
                    <div>
                        {!isVerified ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 w-full mt-4"
                                />
                                <button
                                    onClick={handleVerifyOtp}
                                    className="bg-violet-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 w-full mt-4"
                                />
                                <button
                                    onClick={handleResetPassword}
                                    className="bg-violet-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                                >
                                    Reset Password
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
