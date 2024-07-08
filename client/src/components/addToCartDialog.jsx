import React from 'react';
import { IoMdClose } from "react-icons/io";

const AddToCartDialog = ({ isPopupOpen, handleClosePopup, handleSubmit, quantity, setQuantity, product }) => {
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add to Cart</h2>
          <button onClick={handleClosePopup} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src={'https://applecenter.com.vn/uploads/cms/16632365177447.jpg'}
                alt={product.product_name}
                className="w-full sm:w-48 h-auto rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-2">{product.product_name}</h3>
              <p className="text-gray-600 mb-2">{product.product_description}</p>
              <p className="text-lg text-primary-600 font-semibold mb-4">${product.product_price}</p>
              <label className="block text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full border rounded px-3 py-2"
                min={1}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button onClick={handleClosePopup} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 mr-2">Cancel</button>
          <button onClick={() => handleSubmit(quantity)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-primary-700">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartDialog;
