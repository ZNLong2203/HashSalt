import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; 
import useRefreshAccess from '../hooks/useRefreshAccess';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/carts", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        setCartItems(res.data.metadata.cart_items);
      } catch (err) {
        console.error("Error fetching cart items:", err); 
        if (err.response && err.response.status === 401) {
          // await useRefreshAccess();
          // await fetchCartItems(); // Retry after refresh
        }
      } finally {
        setIsLoading(false); // Data fetched, set loading to false
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/carts/one`, {
        data: { cart_product: itemId }, // Send as request body
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const updatedCartItems = cartItems.filter((item) => item.cart_product._id !== itemId);
      console.log(itemId)
      setCartItems(updatedCartItems);
    } catch(err) {
      console.error("Error removing item from cart:", err);
    }
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
              key={item.cart_product._id} 
              className="flex items-center justify-between p-4 border-b"
            >
              <div className="flex items-center">
                <img
                  src={"https://applecenter.com.vn/uploads/cms/16632365177447.jpg"}
                  alt={item.cart_product.product_name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-medium">{item.cart_product.product_name}</h2>
                  <p className="text-gray-500">Price: ${item.cart_product.product_price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">Qty: {item.cart_quantity}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveItem(item.cart_product._id)}
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
