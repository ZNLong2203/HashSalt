import axios from 'axios';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import ROUTES from '../routes/routes';

const DetailsProduct = () => {
  const { product_id } = useParams();
  const token = localStorage.getItem('accessToken');
  const [product, setProduct] = useState({});
  const [overallRating, setOverallRating] = useState(0); 
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${ROUTES.BE}/api/products/${product_id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        });
        setProduct(res.data);
        setRating(res.data.rating || 0);  

        const resRating = await axios.get(`${ROUTES.BE}/api/reviews/rating/${product_id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        });
        setOverallRating(resRating.data.rating);
      } catch (err) {
        toast.error('Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [product_id]);

  const handleRatingChange = async (newRating) => {
    try {
      await axios.post(`${ROUTES.BE}/api/reviews/rating`, 
        { 
          productId: product_id, 
          rating: newRating 
        }, 
        {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });
      setRating(newRating);
      toast.success('Rating submitted successfully');
    } catch (err) {
      toast.error('Failed to submit rating');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Product Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <img 
            className="w-full rounded-lg shadow-lg" 
            src={'https://applecenter.com.vn/uploads/cms/16632365177447.jpg'} 
            alt={product.product_name}
          />
        </div>
        <div className="md:w-1/2 md:ml-8 mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold mb-4">{product.product_name}</h2>
          <p className="text-gray-700 mb-4">{product.product_description}</p>
          <div className="text-2xl font-bold text-green-600 mb-4">
            ${product.product_price}
          </div>
          <div className="text-lg mb-4">
            Quantity: {product.product_quantity}
          </div>
          
          {/* Highlighted Attributes */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Attributes:</h3>
            <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg shadow-inner">
              {product.product_attributes && Object.entries(product.product_attributes).map(([key, value]) => (
                <li key={key} className="text-gray-700 mb-1">
                  <span className="font-semibold">{key}:</span> {value}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Overall Rating */}
          <div className="flex items-center mb-4">
            <p className="flex flex-row text-lg font-semibold mr-4">Overall rating: 
              <FaStar className="text-yellow-300 ml-2 mt-1" />
              <span className="ml-2">{overallRating} out of 5</span>
            </p>
          </div>
          
          {/* Individual Rating */}
          <div className="flex items-center mb-10">
            <p className="text-lg font-semibold mr-4">Rate this product:</p>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={(index < (hoverRating || rating)) ? 'text-yellow-300' : 'text-gray-300'}
                onClick={() => handleRatingChange(index + 1)}
                onMouseEnter={() => setHoverRating(index + 1)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
