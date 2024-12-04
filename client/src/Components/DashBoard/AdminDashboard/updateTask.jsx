import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskUpdateModal = ({ taskId, onClose }) => {
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        setTaskData(response.data);
      } catch (err) {
        setError('Failed to fetch task.');
      } finally {
        setLoading(false);
      }
    };
    
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, taskData);
      onClose(); // Close modal after update
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  return (
    <div className="modal">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit">Update Task</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default TaskUpdateModal;
