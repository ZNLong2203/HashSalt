import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/routes';
import useStoreToken from '../hooks/useStoreToken';

const UserMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { setAuthenticated, setRole } = useStoreToken();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logOut = async () => {
    try {
      await axios.post(`${ROUTES.BE}/auth/logout`, {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token-storage');
      setAuthenticated(false);
      toast.success('Logout successful');
      
      setTimeout(() => {
        navigate(ROUTES.HOME)
      }, 500); // 0.5 second delay to allow the toast to be visible
    } catch (err) {
      toast.error('Logout failed');
    }
  }

  return (
    <div className="relative">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJj_hJio5ylUnx6cGiuu86AiZYQ3GDTEaA-CayVU-7akEfnYfvm15YCK4NxA8O6OVy9CU&usqp=CAU" // Replace with the user's profile image URL
        alt="User"
        className="h-10 w-10 rounded-full cursor-pointer"
        onClick={handleDropdownToggle}
      />
      {isDropdownOpen && (
        <ul ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <li>
            <button
              onClick={() => navigate(ROUTES.PROFILE)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(ROUTES.ORDERS)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              Orders
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(ROUTES.MYSHOP)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              My Shop
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(ROUTES.MYDISCOUNT)}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              My Discount
            </button>
          </li>
          <li>
            <button
              onClick={() => logOut()}
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
