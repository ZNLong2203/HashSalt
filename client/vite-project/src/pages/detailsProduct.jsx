import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailsProduct = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${product_id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [product_id]);

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
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
