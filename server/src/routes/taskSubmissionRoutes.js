// routes/taskSubmissionRoutes.js
import express from 'express';
import { submitTaskResponse, getTaskSubmissions, updateTaskSubmission } from '../controllers/TaskSubmissionController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:task_id', auth.authMiddleware, submitTaskResponse);
router.get('/:task_id', auth.authMiddleware, getTaskSubmissions);
router.patch('/:submission_id', auth.authMiddleware, auth.employeeAuthMiddleware, updateTaskSubmission);



export default router;
