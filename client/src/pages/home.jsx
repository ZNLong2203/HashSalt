import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { RiAddCircleLine } from 'react-icons/ri';
import AddToCartDialog from '../components/addToCartDialog';
import CategoryBar from '../components/categorybar';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('home');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setQuantity(1);
  };

  const handleAddToCart = async (quantity) => {
    try {
      await axios.post(
        'http://localhost:3000/api/carts/add',
        { cart_product: selectedProduct._id, cart_quantity: quantity },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      );
      handleClosePopup();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <CategoryBar setCategory={setCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              className="w-full h-56 object-cover"
              src="https://applecenter.com.vn/uploads/cms/16632365177447.jpg"
              alt={product.product_name}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-900">{product.product_name}</h2>
              <p className="text-lg font-semibold mb-4 text-purple-900 underline underline-offset-4">
                Price: ${product.product_price}
              </p>
              <div className="flex justify-center space-x-6">
                <button
                  className="flex items-center justify-center bg-sky-400 text-white rounded-md px-4 py-2"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <AiFillEye className="mr-2" />
                  View
                </button>
                <button
                  className="flex items-center justify-center bg-black text-white rounded-md px-4 py-2"
                  onClick={() => handleOpenPopup(product)}
                >
                  <RiAddCircleLine className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <AddToCartDialog
          isPopupOpen={isPopupOpen}
          handleClosePopup={handleClosePopup}
          handleSubmit={handleAddToCart}
          quantity={quantity}
          setQuantity={setQuantity}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Home;
