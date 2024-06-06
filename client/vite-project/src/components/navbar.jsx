import React, { useState, useEffect } from 'react';
import ROUTES from '../routes/routes';
import useStoreToken from '../hooks/useStoreToken';
import UserMenu from './userMenu';

const Navbar = () => {
  const {isAuthenticated} = useStoreToken();

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">E-Shop</a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="/shop" className="text-gray-600 hover:text-gray-800">Shop</a>
          <a href="#footer" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#footer" className="text-gray-600 hover:text-gray-800">Contact</a>
        </div>
        <div className="relative">
          <input
            type="text"
            className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            placeholder="Search..."
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
            <svg className="h-4 w-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.9 14.32l4.3 4.3-1.42 1.42-4.3-4.3a8 8 0 111.42-1.42zm-5.4 2.28a6 6 0 100-12 6 6 0 000 12z"/>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <a href={ROUTES.LOGIN} className="text-gray-600 hover:text-gray-800">Login</a>
              <a href={ROUTES.REGISTER} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;