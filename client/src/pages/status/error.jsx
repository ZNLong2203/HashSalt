import React from 'react';
import { TbMoodSad } from "react-icons/tb";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md text-center p-8 bg-white rounded shadow-md">
        <TbMoodSad className="text-6xl text-gray-600 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-800 mt-4">404</h1>
        <p className="text-gray-600 mt-2">
          Oops! The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
