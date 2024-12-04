import express from 'express';
import { register, login, makeEmployee, getAllEmployees, logout } from '../controllers/UserController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/make-employee/:userId', auth.authMiddleware, auth.adminAuthMiddleware, makeEmployee); // Admin-only route
router.get('/employees', auth.authMiddleware, getAllEmployees); // Admin and employee route with different views
router.post('/logout',auth.authMiddleware , logout )

export default router;
