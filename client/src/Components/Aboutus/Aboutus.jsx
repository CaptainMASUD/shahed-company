import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaShip, FaPlane, FaTruck } from 'react-icons/fa';

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        About Shahed Import Export Limited
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaGlobeAmericas className="text-teal-600 mr-2" />
            Our Global Reach
          </h2>
          <p className="text-gray-600 mb-4">
            Since our establishment in 2010, Shahed Import Export Limited has been at the forefront of international trade. We've built a robust network spanning over 50 countries, facilitating seamless import and export operations across diverse markets.
          </p>
          <p className="text-gray-600">
            Our expertise in navigating complex international trade regulations and our commitment to quality have made us a trusted partner for businesses worldwide.
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaShip className="text-teal-600 mr-2" />
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            At Shahed Import Export Limited, our mission is to bridge global markets by providing efficient, reliable, and innovative import-export solutions. We strive to:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Facilitate seamless international trade operations</li>
            <li>Ensure compliance with international trade regulations</li>
            <li>Promote sustainable and ethical business practices</li>
            <li>Foster long-term partnerships with clients and suppliers</li>
          </ul>
        </motion.div>
      </div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaPlane className="text-teal-600 mr-2" />
          Our Expertise
        </h2>
        <p className="text-gray-600 mb-4">
          With over a decade of experience in the import-export industry, we've developed unparalleled expertise in:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <FaTruck className="text-teal-600 mr-2" />
            <span>Logistics Management</span>
          </div>
          <div className="flex items-center">
            <FaGlobeAmericas className="text-teal-600 mr-2" />
            <span>Market Analysis</span>
          </div>
          <div className="flex items-center">
            <FaShip className="text-teal-600 mr-2" />
            <span>Customs Clearance</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
