import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaRegComment } from 'react-icons/fa'; // Importing icons

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all contact submissions when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/contact/all', {
          withCredentials: true,
        });
        setMessages(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">All Contact Messages</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display all messages */}
      <div>
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages found.</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message.id} className="mb-6 p-6 border-b border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-300">
                <div className="flex items-center mb-2">
                  <FaUser className="text-teal-500 mr-3" />
                  <p className="text-lg font-semibold">{message.name}</p>
                </div>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="text-teal-500 mr-3" />
                  <p className="text-sm text-gray-600">{message.email}</p>
                </div>
                <div className="flex items-start">
                  <FaRegComment className="text-teal-500 mr-3 mt-1" />
                  <p className="text-gray-700">{message.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
