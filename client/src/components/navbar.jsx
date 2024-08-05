import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStoreToken from '../hooks/useStoreToken';
import ROUTES from '../routes/routes';
import { FaShoppingCart } from "react-icons/fa";
import UserMenu from './userMenu';
import Notifications from './notifications';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated, role } = useStoreToken();

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchItem) {
      navigate(`${ROUTES.HOME}?name=${searchItem}`);
    }
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">E-Shop</a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="/" className="text-gray-600 hover:text-gray-800">Shop</a>
          <a href="#footer" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#footer" className="text-gray-600 hover:text-gray-800">Contact</a>
          {role === 'admin' && (
            <a href={ROUTES.DASHBOARD} className="text-gray-600 hover:text-gray-800">Dashboard</a>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            placeholder="Search..."
            value={searchItem}
            onChange={handleInputChange}
          />
          <button 
            type="submit" 
            className="absolute right-0 top-0 mt-3 mr-4" 
            onClick={handleSearch}
          >
            <svg className="h-4 w-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.9 14.32l4.3 4.3-1.42 1.42-4.3-4.3a8 8 0 111.42-1.42zm-5.4 2.28a6 6 0 100-12 6 6 0 000 12z"/>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button 
                type="button" 
                className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={toggleDialog}
              >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">3</div>
              </button>
              <FaShoppingCart
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => navigate(ROUTES.CART)} 
              />
              <UserMenu />
            </>
          ) : (
            <>
              <a href={ROUTES.LOGIN} className="text-gray-600 hover:text-gray-800">Login</a>
              <a href={ROUTES.REGISTER} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register</a>
            </>
          )}
        </div>
      </div>
      {isDialogOpen && (
        <div className='absolute right-40 top-16 z-50 w-96 bg-white rounded-lg shadow-lg'>
          <Notifications />
        </div>
      )}
    </nav>
  );
};

export default Navbar;