import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRefreshAccess } from '../hooks/useRefreshAccess';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const DetailsProduct = () => {
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${product_id}`, {}, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        if(err.response.status === 401) {
          await useRefreshAccess();
          await fetchProduct();
        }
      }
    };
    fetchProduct();
  }, [product_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/products/${product_id}`, product, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401) {
        await useRefreshAccess();
        await handleSave();
      }
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
          {isEditing ? (
            <>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="text"
                name="product_name"
                value={product.product_name || ''}
                onChange={handleInputChange}
                placeholder="Product Name"
              />
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                name="product_description"
                value={product.product_description || ''}
                onChange={handleInputChange}
                placeholder="Product Description"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="number"
                name="product_price"
                value={product.product_price || ''}
                onChange={handleInputChange}
                placeholder="Product Price"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                type="number"
                name="product_quantity"
                value={product.product_quantity || ''}
                onChange={handleInputChange}
                placeholder="Product Quantity"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <FaSave className="mr-2" /> Save
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-semibold mb-4">{product.product_name}</h2>
              <p className="text-gray-700 mb-4">{product.product_description}</p>
              <div className="text-2xl font-bold text-green-600 mb-4">
                ${product.product_price}
              </div>
              <div className="text-lg mb-4">
                Quantity: {product.product_quantity}
              </div>
              <div className="flex justify-start space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 flex items-center"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Back to Products
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
