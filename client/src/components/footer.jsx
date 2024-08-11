import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mb-4">Company</h2>
          <Link to="/about" className="mb-2 hover:text-gray-400">About Us</Link>
          <Link to="/contact" className="mb-2 hover:text-gray-400">Contact Us</Link>
          <Link to="/careers" className="mb-2 hover:text-gray-400">Careers</Link>
          <Link to="/blog" className="mb-2 hover:text-gray-400">Blog</Link>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mb-4">Help</h2>
          <Link to="/support" className="mb-2 hover:text-gray-400">Support</Link>
          <Link to="/faq" className="mb-2 hover:text-gray-400">FAQs</Link>
          <Link to="/shipping" className="mb-2 hover:text-gray-400">Shipping</Link>
          <Link to="/returns" className="mb-2 hover:text-gray-400">Returns</Link>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mb-4">Legal</h2>
          <Link to="/privacy" className="mb-2 hover:text-gray-400">Privacy Policy</Link>
          <Link to="/terms" className="mb-2 hover:text-gray-400">Terms & Conditions</Link>
          <Link to="/disclaimer" className="mb-2 hover:text-gray-400">Disclaimer</Link>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-white hover:text-gray-400"><FaFacebookF size={20} /></a>
            <a href="https://twitter.com" className="text-white hover:text-gray-400"><FaTwitter size={20} /></a>
            <a href="https://instagram.com" className="text-white hover:text-gray-400"><FaInstagram size={20} /></a>
            <a href="https://linkedin.com" className="text-white hover:text-gray-400"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
