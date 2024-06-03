// EditProduct.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaTimes } from 'react-icons/fa';

const EditProduct = () => {
  // const history = useHistory();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/products/${product_id}`, product);
      history.push(`/details/${product_id}`);
    } catch (err) {
      console.log(err);
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
        {/* Include other input fields similarly */}
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
