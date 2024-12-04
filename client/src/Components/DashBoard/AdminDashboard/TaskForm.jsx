import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaClipboardList, FaSpinner } from 'react-icons/fa';
import { MdDescription, MdAssignment } from 'react-icons/md';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    description: '',
    status: 'pending',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', formData, {
        withCredentials: true,
      });

      setMessage(response.data.message);
      setFormData({
        user_id: '',
        description: '',
        status: 'pending',
        details: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <FaClipboardList className="mr-3 text-teal-500" />
        Create Task
      </h1>
      {message && <p className="text-green-600 mb-4 font-semibold">{message}</p>}
      {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="user_id" className="block text-gray-700 font-medium mb-2 flex items-center">
              <FaUser className="mr-2 text-teal-500" />
              Assign to User ID (optional)
            </label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="Enter User ID or leave blank"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div className="relative">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2 flex items-center">
              <MdAssignment className="mr-2 text-teal-500" />
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2 flex items-center">
            <MdDescription className="mr-2 text-teal-500" />
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 h-24"
          />
        </div>
        <div className="relative">
          <label htmlFor="details" className="block text-gray-700 font-medium mb-2 flex items-center">
            <MdDescription className="mr-2 text-teal-500" />
            Task Details
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Provide additional details (optional)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 h-32"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 text-white py-3 px-6 rounded-md hover:bg-teal-600 transition duration-300 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Creating Task...
            </>
          ) : (
            'Create Task'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

