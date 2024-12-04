import express from 'express';
import { getAllContactMessages, submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

// Route to handle contact form submission
router.post('/submit', submitContactForm);
router.get('/all', getAllContactMessages);

export default router;
