// routes/taskRoutes.js
import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/TaskController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a task (admin only)
router.post('/', auth.authMiddleware, createTask);

// Get tasks for the current user (admin and employee)
router.get('/', auth.authMiddleware, getTasks);

// Update a task (admin only)
router.patch('/:taskId', auth.authMiddleware, updateTask);

// Delete a task (admin only)
router.delete('/:taskId', auth.authMiddleware, deleteTask);

export default router;
