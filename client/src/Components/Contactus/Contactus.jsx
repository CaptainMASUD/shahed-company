import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

// Modal component for success message
const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h3 className="text-xl font-semibold text-teal-600">Success!</h3>
        <p className="text-gray-600 mt-4">Your message has been sent successfully.Our team will reach you as Soon as Possible.</p>
       
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !message) {
      setStatus("All fields are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show the success modal and reset form fields
        setShowModal(true);
        setName('');
        setEmail('');
        setMessage('');
        setStatus("");
      } else {
        setStatus(data.error || "Failed to send message.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
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
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        Contact Us
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            We'd love to hear from you. Please fill out the form below or use our contact information to reach out to us.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-teal-600 mr-2" />
              <span className="text-gray-600">info@shahedcompany.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-teal-600 mr-2" />
              <span className="text-gray-600">+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-teal-600 mr-2" />
              <span className="text-gray-600">123 Business Street, City, Country</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Send Message
              </motion.button>
            </div>
          </form>
          {status && <p className="text-gray-600 mt-4">{status}</p>}
        </motion.div>
      </div>

      {/* Modal for success */}
      <Modal isVisible={showModal} onClose={handleCloseModal} />
    </motion.div>
  );
};

export default Contact;
