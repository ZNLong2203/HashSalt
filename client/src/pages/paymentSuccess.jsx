import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaymentSuccessPage = () => {

  useEffect(() => {
  
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto">
        <div className="text-green-500">
          <FaCheckCircle size={80} />
        </div>
        <h2 className="text-2xl font-bold mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
