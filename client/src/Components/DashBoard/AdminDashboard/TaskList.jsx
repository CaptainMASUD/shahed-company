import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { Toast } from 'flowbite-react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showToast('Failed to fetch tasks', 'error');
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
      setIsModalOpen(false);
      setSelectedTask(null);
      showToast('Task updated successfully', 'success');
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task.id !== taskId));
        showToast('Task deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting task:', error);
        showToast('Failed to delete task', 'error');
      }
    }
  };

  const filterTasks = () => {
    let filtered = tasks;
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.id.toString().includes(searchQuery) || task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedFilter) {
      filtered = filtered.filter(task => task.status === selectedFilter);
    }
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    filterTasks();
  }, [searchQuery, selectedFilter, tasks]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        Task Manager
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID or Description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
      </motion.div>

      <TaskList
        tasks={filteredTasks}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteTask}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onUpdateTask={handleUpdateTask}
      />

      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4"
          >
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                <FiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {toast.message}
              </div>
              <Toast.Toggle />
            </Toast>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TaskList = ({ tasks, onEditClick, onDeleteClick }) => {
  return (
    <AnimatePresence>
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white shadow-md rounded-lg p-6 mb-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{task.description}</h2>
              <p className="text-gray-600">Task ID: <span className="font-semibold">{task.id}</span></p>
              <p className="mt-2">
                Status: 
                <span className={`font-semibold ml-2 px-2 py-1 rounded-full text-xs ${
                  task.status === 'completed' ? 'bg-green-200 text-green-800' :
                  task.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </p>
              <p className="mt-2 text-gray-700">{task.details}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                onClick={() => onEditClick(task)}
              >
                <FiEdit size={20} />
              </button>
              <button
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                onClick={() => onDeleteClick(task.id)}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

const TaskModal = ({ isOpen, onClose, task, onUpdateTask }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setStatus(task.status);
      setDetails(task.details);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask({ ...task, description, status, details });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Task</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                  Details
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskManager;

