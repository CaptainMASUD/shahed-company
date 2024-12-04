import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/TaskController.js';

const router = express.Router();

// Create a task
router.post('/', createTask);

// Get all tasks
router.get('/', getTasks);

// Update a task
router.patch('/:taskId', updateTask);

// Delete a task
router.delete('/:taskId', deleteTask);

export default router;
