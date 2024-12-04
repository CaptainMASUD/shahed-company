import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Shahed Company Limited</h3>
            <p className="text-gray-400">Providing innovative solutions since 2023</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white hover:text-teal-400 transition-colors">
                <FaFacebook size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white hover:text-teal-400 transition-colors">
                <FaTwitter size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white hover:text-teal-400 transition-colors">
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white hover:text-teal-400 transition-colors">
                <FaInstagram size={24} />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2023 Shahed Company Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
