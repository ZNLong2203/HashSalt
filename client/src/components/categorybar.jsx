import React from 'react';
import { FaCouch, FaTshirt, FaLaptop } from 'react-icons/fa';

const CategoryBar = ({ setCategory }) => {
  return (
    <div className="bg-white py-2 z-50 mb-8">
      <div className="flex justify-around divide-x divide-gray-500">
        <div className="absolute right-0 top-0 h-full w-px bg-gray-500"></div>
        <button onClick={() => setCategory('Furnitures')} className="flex flex-col items-center justify-center bg-white px-4 py-2 relative">
          <FaCouch size={24} />
          <span className="text-sm">Furnitures</span>
          <div className="absolute right-0 top-0 h-full w-px bg-gray-500"></div>
        </button>
        <button onClick={() => setCategory('Electronics')} className="flex flex-col items-center justify-center bg-white px-4 py-2 relative">
          <FaLaptop size={24} />
          <span className="text-sm">Electronics</span>
          <div className="absolute right-0 top-0 h-full w-px bg-gray-500"></div>
        </button>
        <button onClick={() => setCategory('Clothings')} className="flex flex-col items-center justify-center bg-white px-4 py-2 relative">
          <FaTshirt size={24} />
          <span className="text-sm">Clothings</span>
          <div className="absolute right-0 top-0 h-full w-px bg-gray-500"></div>
        </button>
      </div>
    </div>
  );
};

export default CategoryBar;
