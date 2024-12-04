import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // To track if we're in update mode
  const [currentTask, setCurrentTask] = useState({}); // To store the task being updated
  const [formData, setFormData] = useState({
    description: '',
    status: '',
    details: '',
  });

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', { withCredentials: true });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Handle task delete
  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      setMessage(response.data.message);
      // Remove the deleted task from the list
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  // Handle task update (open update form)
  const handleUpdate = (task) => {
    setIsUpdating(true);
    setCurrentTask(task);
    setFormData({
      description: task.description,
      status: task.status,
      details: task.details,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the updated task
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${currentTask._id}`,
        formData,
        { withCredentials: true }
      );
      setMessage(response.data.message);
      // Update the task in the list
      setTasks(tasks.map(task => (task._id === currentTask._id ? response.data.task : task)));
      setIsUpdating(false); // Exit update mode
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Tasks List</h1>
      
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          {isUpdating ? (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700">Update Task</h2>
              <form onSubmit={handleSubmitUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <input
                    type="text"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdating(false)}
                  className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Details</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
  {tasks.map((task, index) => (
   <tr key={task._id || index}>
   <td className="px-4 py-2 border">{task.user_id || 'N/A'}</td>
   <td className="px-4 py-2 border">{task.description}</td>
   <td className="px-4 py-2 border">{task.status}</td>
   <td className="px-4 py-2 border">{task.details || 'N/A'}</td>
   <td className="px-4 py-2 border text-center">
     <button onClick={() => handleUpdate(task)} className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Update</button>
     <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
   </td>
 </tr>
 
  ))}
</tbody>

            </table>
          )}
        </>
      )}
    </div>
  );
};

export default TasksList;
