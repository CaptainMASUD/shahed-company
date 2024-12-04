import express from 'express';
import {
  register,
  login,
  logout,
  makeEmployee,
  assignTask,
  getTasks,
  updateTaskStatus,
  getAllEmployees,
  deleteEmployee
} from '../controllers/auth.controllers.js';

import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login an existing user
router.post('/login', login);

// Logout user
router.post('/logout', authMiddleware, logout);

// Make a user an employee (Admin only)
router.post('/makeEmployee', authMiddleware, isAdmin, makeEmployee);

// Assign a task to an employee (Admin only)
router.post('/assignTask', authMiddleware, isAdmin, assignTask);

// Get all tasks for the logged-in employee
router.get('/tasks', authMiddleware, getTasks);

// Update task status (Employee only)
router.put('/tasks/:taskId', authMiddleware, updateTaskStatus);

// Get all employees (Admin only)
router.get('/employees', authMiddleware, isAdmin, getAllEmployees);

// Delete an employee (Admin only)
router.delete('/employees/:userId', authMiddleware, isAdmin, deleteEmployee);

export default router;
