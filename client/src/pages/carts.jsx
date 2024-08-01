import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { loadStripe } from "@stripe/stripe-js";
import ROUTES from '../routes/routes';

const CartPage = () => {
  const token = localStorage.getItem('accessToken');
  const [cartItems, setCartItems] = useState([]);
  const [discounts, setDiscounts] = useState({});
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const stripePromise = loadStripe("pk_test_51PQmYTIYYB20QSq1o1yZlZ61qHl6ZgNtOhgkHXGI14siKnCf9LEV23WAkK6sLnOheYO06ds9fXXJQZKC6Kn2u4k8005CXtvDgp");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${ROUTES.BE}/api/carts`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const itemsWithDiscount = res.data.metadata.cart.cart_items.map(item => ({
          ...item,
          discount: null
        }));
        setCartItems(itemsWithDiscount);
        await fetchDiscounts(itemsWithDiscount);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDiscounts = async (items) => {
      try {
        const discountPromises = items.map(item =>
          axios.get(`${ROUTES.BE}/api/discounts/product/${item.cart_product._id}`)
        );
        const discountResults = await Promise.all(discountPromises);
        const discountsData = discountResults.reduce((acc, res, index) => {
          acc[items[index].cart_product._id] = res.data;
          return acc;
        }, {});
        setDiscounts(discountsData);
        updateTotal(items, discountsData);
      } catch (err) {
        console.error("Error fetching discounts:", err);
      }
    };

    fetchCartItems();
  }, []);

  const updateTotal = (items, discountsData) => {
    const totalAmount = items.reduce((acc, item) => {
      const discount = item.discount;
      const discountedPrice = calculateDiscountedPrice(item.cart_product.product_price, discount);
      return acc + (discountedPrice * item.cart_quantity);
    }, 0);
    setTotal(totalAmount);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`${ROUTES.BE}/api/carts/one`, {
        data: { cart_product: itemId },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const updatedCartItems = cartItems.filter((item) => item.cart_product._id !== itemId);
      setCartItems(updatedCartItems);
      updateTotal(updatedCartItems, discounts);
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  const handleDiscountChange = (itemId, discountCode) => {
    const selectedDiscount = discounts[itemId]?.find(discount => discount.discount_code === discountCode);
    const updatedCartItems = cartItems.map(item => {
      if (item.cart_product._id === itemId) {
        return { ...item, discount: selectedDiscount };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    updateTotal(updatedCartItems, discounts);
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    if (discount.discount_type === 'percentage') {
      return price - (price * discount.discount_value / 100);
    }
    if (discount.discount_type === 'fixed') {
      return price - discount.discount_value;
    }
    return price;
  };

  const handleOrder = async () => {
    try {
      const itemsWithDiscountedPrice = cartItems.map(item => ({
        ...item,
        cart_product: {
          ...item.cart_product,
          product_price: Math.round(calculateDiscountedPrice(item.cart_product.product_price, item.discount), 2) 
        }
      }));

      const res = await axios.post(`${ROUTES.BE}/api/orders`, {
        cart_items: itemsWithDiscountedPrice,
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
      }
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3">
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
                    src={item.cart_product.product_image || "https://applecenter.com.vn/uploads/cms/16632365177447.jpg"}
                    alt={item.cart_product.product_name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium">{item.cart_product.product_name}</h2>
                    <p className="text-gray-500">
                      Price: ${item.cart_product.product_price.toFixed(2)}
                    </p>
                    <p className="text-gray-500">
                      Discounted Price: ${calculateDiscountedPrice(item.cart_product.product_price, item.discount).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <select
                    value={item.discount ? item.discount.discount_code : ''}
                    onChange={(e) => handleDiscountChange(item.cart_product._id, e.target.value)}
                    className="mr-4 p-1 border rounded-md w-44"
                  >
                    <option value="" disabled>Select discount</option>
                    {discounts[item.cart_product._id]?.map(discount => (
                      <option key={discount._id} value={discount.discount_code}>
                        {discount.discount_description}
                      </option>
                    ))}
                  </select>
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
          </div>
        )}
      </div>
      <div className="w-full lg:w-1/4 lg:ml-20 mt-10 lg:mt-0">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-10">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="mb-4">
            <p className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </p>
          </div>
          <div className="mb-4">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleOrder}
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
