// controllers/TaskController.js
import Task from '../models/Task.model.js';
import User from '../models/User.model.js';  // Adjust the path according to your project structure


export const createTask = async (req, res) => {
  try {
    const { user_id = null, description, status = 'pending', details } = req.body;
    
    // Ensure user_id is either a valid user ID or null for all employees
    if (user_id !== null) {
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
    }

    const task = new Task({ user_id, description, status, details });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTasks = async (req, res) => {
  try {
    // Fetch all tasks regardless of the user's role
    const tasks = await Task.findForAllEmployees(); // Replace with your actual method to fetch all tasks
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update a task (admin only)
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { description, status, details } = req.body;

    const user = req.user;
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can update tasks' });
    }

    const task = new Task({ id: taskId, description, status, details });
    await task.update();
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task (admin only)
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const user = req.user;
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can delete tasks' });
    }

    await Task.delete(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
