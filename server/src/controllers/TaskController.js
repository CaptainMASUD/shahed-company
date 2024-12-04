import Task from '../models/Task.model.js';

// Create a task
export const createTask = async (req, res) => {
  try {
    const { user_id = null, description, status = 'pending', details } = req.body;
    const task = new Task({ user_id, description, status, details });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findForAllEmployees();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description, status, details } = req.body;

    const task = new Task({ id: taskId, description, status, details });
    await task.update();
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Use findById to check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // If task exists, delete it
    await Task.delete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
