import express from 'express';
import { submitTaskResponse, getTaskSubmissions, updateTaskSubmission } from '../controllers/TaskSubmissionController.js';

const router = express.Router();

// Routes without restrictions
router.post('/:task_id', submitTaskResponse);
router.get('/:task_id', getTaskSubmissions);
router.patch('/:submission_id', updateTaskSubmission);

export default router;
