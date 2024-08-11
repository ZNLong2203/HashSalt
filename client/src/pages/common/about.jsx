import React from 'react';
import { FaCheckCircle, FaHeart, FaUsers } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Header Image */}
      <div className="relative w-full h-96">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/016/840/429/small/memphis-blue-background-with-halftone-and-line-elements-for-wallpaper-web-banner-or-landing-page-vector.jpg"
          alt="About Us"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">About Us</h1>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Who We Are</h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Welcome to E-Shop, your number one source for all things product category. We're dedicated to giving you the very best of product/service, with a focus on dependability, customer service, and uniqueness.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Our mission is to give you convenience in online shopping. We aim to offer high-quality products that not only meet but exceed your expectations.
          </p>
          <div className="flex justify-center">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <FaHeart className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Passion</h3>
            <p className="text-gray-700">
              We are passionate about delivering the best products and services to our customers.
            </p>
          </div>
          <div className="text-center">
            <FaUsers className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-700">
              We value our community and believe in giving back.
            </p>
          </div>
          <div className="text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-700">
              We hold ourselves to the highest standards of integrity and honesty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
