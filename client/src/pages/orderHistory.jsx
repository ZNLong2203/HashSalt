import axios from 'axios';
import { FaBoxOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const orders = [
  {
    id: '12345',
    date: '2024-07-01',
    items: [
      { name: 'Product 1', quantity: 2, price: 50 },
      { name: 'Product 2', quantity: 1, price: 100 },
    ],
    total: 200,
    status: 'Delivered',
  },
  {
    id: '12346',
    date: '2024-06-25',
    items: [
      { name: 'Product 3', quantity: 1, price: 150 },
    ],
    total: 150,
    status: 'Cancelled',
  },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">My Orders</h1>
      <div className="container mx-auto">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-8 rounded-2xl shadow-xl mb-8 transform transition duration-500 hover:scale-105">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
              <span className={`text-2xl ${order.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>
                {order.status === 'Delivered' ? <FaCheckCircle /> : <FaTimesCircle />} {order.status}
              </span>
            </div>
            <div className="border-t-2 border-gray-200 pt-4">
              <p className="text-gray-700"><strong>Date:</strong> {order.date}</p>
              <p className="text-gray-700"><strong>Total:</strong> ${order.total}</p>
            </div>
            <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Items:</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <p className="text-gray-800">{item.name} (x{item.quantity})</p>
                  <p className="text-gray-800">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
