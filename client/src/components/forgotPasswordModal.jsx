import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root'); 

const ForgotPasswordModal = ({ isOpen, onRequestClose }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = async () => {
        try {
            await axios.post('/api/auth/send-otp', { email });
            toast.success('OTP sent to your email');
            setOtpSent(true);
        } catch (err) {
            toast.error('Failed to send OTP');
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
                        <p className="text-gray-700 mt-4">Check your email for the OTP.</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
