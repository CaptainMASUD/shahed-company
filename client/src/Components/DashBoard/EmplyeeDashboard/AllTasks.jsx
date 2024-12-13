import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector
import { FaTasks } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { GoTasklist } from "react-icons/go";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Access current user from Redux state
  const currentUser = useSelector((state) => state.employee.currentUser); // Adjust the slice name if different
  const userId = currentUser?.id;

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (err) {
        setError('An error occurred while fetching tasks.');
      }
    };

    fetchTasks();
  }, []);

  // Open the modal and set the selected task ID
  const handleOpenModal = (taskId) => {
    setSelectedTaskId(taskId);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSubmissionText('');
    setSuccessMessage('');
  };

  const handleSubmitTask = async () => {
    if (!submissionText.trim()) {
      setSuccessMessage('Please enter a valid response.');
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/submit/${selectedTaskId}`,
        {
          submission_text: submissionText,
          employee_id: userId, // Pass user ID in the body
        },
        { withCredentials: true }
      );
      setSuccessMessage(response.data.message);
      setSubmissionText('');
    } catch (error) {
      setSuccessMessage(error.response?.data?.error || 'An error occurred while submitting the task.');
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-teal-600 flex items-center justify-center">
          <GoTasklist className="mr-2 text-teal-500" />
          <span>All Tasks</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage and track all your tasks in a convenient table.
        </p>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Table Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto shadow-md sm:rounded-lg">
          <table className="w-full table-auto text-left">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="px-6 py-3 text-sm font-medium">Task ID</th>
                <th className="px-6 py-3 text-sm font-medium">Description</th>
                <th className="px-6 py-3 text-sm font-medium">Details</th>
                <th className="px-6 py-3 text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-teal-50">
                    <td className="px-6 py-4">{task.id}</td>
                    <td className="px-6 py-4 text-gray-700">{task.description}</td>
                    <td className="px-6 py-4 text-gray-600">{task.details}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          task.status === 'pending'
                            ? 'bg-teal-100 text-teal-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 focus:outline-none"
                        onClick={() => handleOpenModal(task.id)}
                      >
                        Submit Task
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Submit Task Response</h2>
            {successMessage && <p className="text-teal-500 mb-4">{successMessage}</p>}
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows="5"
              placeholder="Enter your response..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                onClick={handleSubmitTask}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
