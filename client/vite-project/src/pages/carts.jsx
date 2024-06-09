import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; 
import useRefreshAccess from '../hooks/useRefreshAccess';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/cart', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            setCartItems(res.data);
        } catch(err) {
            console.log(err);
            if(err.response.status === 401) {
                await useRefreshAccess();
                await fetchCartItems();
            }
        }
    }
    // fetchCartItems();
  }, [])

  const handleRemoveItem = (itemId) => {
    // Implement your logic to remove item from the cart
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          {cartItems.map(item => (
            <div 
              key={item.cart_product} 
              className="flex items-center justify-between p-4 border-b"
            >
              <div className="flex items-center">
                <img
                  src={`path/to/your/product/images/${item.cart_product}.jpg`} // Replace with your image path logic
                  alt="Product Image"
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-medium">{item.cart_product.name}</h2>
                  <p className="text-gray-500">Price: ${item.cart_product.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Qty: {item.cart_quantity}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item.cart_product)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {/* Add subtotal, total, and checkout button below */}
        </div>
      )}
    </div>
  );
}

export default CartPage;
