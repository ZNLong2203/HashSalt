import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useRefreshAccess from '../../hooks/useRefreshAccess'; 
import { FaSave, FaTimes } from 'react-icons/fa';
import ROUTES from '../../routes/routes';

const EditProduct = () => {
  const token = localStorage.getItem('accessToken');
  const { product_id } = useParams();
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${ROUTES.BE}/api/products/${product_id}`, {}, {
            headers: {
              Authorization: 'Bearer ' + token,
            }
        });
        setProduct(res.data);
      } catch (err) {
        console.log(err);
        if(err.response.status === 401) {
          // await useRefreshAccess();
          // await fetchProduct();
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
      await axios.put(`${ROUTES.BE}/api/products/${product_id}`, product, {
          headers: {
              Authorization: 'Bearer ' + token,
          }
      });
      history.push(`/details/${product_id}`);
    } catch (err) {
      console.log(err);
      if(err.response.status === 401) {
        // await useRefreshAccess();
        // await handleSave();
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Edit Product</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="text"
          name="product_name"
          value={product.product_name || ''}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => history.goBack()}
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
      </div>
    </div>
  );
};

export default EditProduct;
