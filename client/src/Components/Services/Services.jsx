import React from 'react';
import { motion } from 'framer-motion';
import { FaShip, FaPlane, FaTruck, FaWarehouse, FaFileContract, FaChartLine } from 'react-icons/fa';

const serviceData = [
  {
    icon: FaShip,
    title: 'Sea Freight',
    description: 'Efficient and cost-effective sea freight solutions for your global trade needs.',
  },
  {
    icon: FaPlane,
    title: 'Air Freight',
    description: 'Fast and reliable air freight services for time-sensitive shipments.',
  },
  {
    icon: FaTruck,
    title: 'Land Transportation',
    description: 'Comprehensive land transportation network for domestic and cross-border logistics.',
  },
  {
    icon: FaWarehouse,
    title: 'Warehousing',
    description: 'State-of-the-art warehousing facilities for secure storage and distribution.',
  },
  {
    icon: FaFileContract,
    title: 'Customs Brokerage',
    description: 'Expert customs clearance services to navigate complex international regulations.',
  },
  {
    icon: FaChartLine,
    title: 'Trade Consulting',
    description: 'Strategic trade consulting to optimize your import-export operations.',
  },
];

const Services = () => {
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
        Our Services
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
      >
        Shahed Company Limited offers a comprehensive range of import-export services to streamline your global trade operations.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-full mb-4 mx-auto">
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
            <motion.div
              whileHover={{ y: 0 }}
              initial={{ y: '100%' }}
              transition={{ type: 'tween' }}
              className="bg-teal-600 p-4 text-white text-center"
            >
              Learn More
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
