import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Task from '../models/Task.model.js';

// Register a new user
export const register = async (req, res) => {
  const { name, address, phoneNo, username, email, password } = req.body;

  if (!name || !address || !phoneNo || !username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      address,
      phoneNo,
      username,
      email,
      password: hashedPassword,
      isAdmin: 0,
      isEmployee: 0
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Login an existing user
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists and verify the password
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the user is an employee
    if (user.isEmployee === 0) {
      return res.status(403).json({ error: 'User is not an employee' });
    }

    // Create a JWT token with user information
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin, isEmployee: user.isEmployee },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set the token in a secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    // Return the token, isAdmin, and isEmployee flags to the client
    res.json({
      message: 'Login successful',
      token,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


// Logout function
export const logout = (req, res) => {
  res.clearCookie('token'); // Clear the JWT token from the cookies
  res.json({ message: 'Logout successful' });
};

// Make a user an employee (Admin only)
export const makeEmployee = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isEmployee = 1;
    await user.update();

    res.json({ message: 'User is now an employee' });
  } catch (error) {
    console.error('Error making employee:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Assign a task to an employee (Admin only)
export const assignTask = async (req, res) => {
  const { userId, taskDescription } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || !user.isEmployee) return res.status(404).json({ error: 'Employee not found' });

    const task = new Task({ userId, description: taskDescription });
    await task.save();

    res.status(201).json({ message: 'Task assigned successfully!' });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get all tasks for a logged-in employee
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update task status (Employee)
export const updateTaskStatus = async (req, res) => {
  const { taskId, status, details } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task || task.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    task.status = status;
    task.details = details;
    await task.update();

    res.json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get all employees (Admin only)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.findEmployees();
    res.json(employees);
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Delete an employee (Admin only)
export const deleteEmployee = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user || !user.isEmployee) return res.status(404).json({ error: 'Employee not found' });

    await User.delete(userId);

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Middleware to check if user is authenticated (with cookie token)
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;

    if (req.user.isEmployee === 0) {
      return res.status(403).json({ error: 'User is not an employee' });
    }

    next();
  });
};

// Admin middleware to check if the user has admin rights
export const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  next();
};
