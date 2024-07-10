import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBoxOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OrdersPage = () => {
  const token = localStorage.getItem('accessToken');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/orders', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const fetchedOrders = res.data.order_delivery;
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  if (!Array.isArray(orders)) {
    return <div className="min-h-screen bg-gray-100 p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">My Orders</h1>
      <div className="container mx-auto">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-8 rounded-2xl shadow-xl mb-8 transform transition duration-500 hover:scale-105">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order #{order._id}</h2>
              <span className={`text-2xl ${order.order_status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>
                {order.order_status === 'Delivered' ? <FaCheckCircle /> : <FaTimesCircle />} {order.order_status}
              </span>
            </div>
            <div className="border-t-2 border-gray-200 pt-4">
              <p className="text-gray-700"><strong>Date:</strong> {new Date(order.order_carts.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700"><strong>Total:</strong> ${order.order_carts.cart_total}</p>
            </div>
            <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Items:</h3>
              {order.order_carts.cart_items.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <p className="text-gray-800">{item.cart_product.product_name} (x{item.cart_quantity})</p>
                  <p className="text-gray-800">${item.cart_product.product_price}</p>
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
