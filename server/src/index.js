import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import table from  './config/table.js'; 
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import task_submissions from './routes/taskSubmissionRoutes.js';
import cookieParser from "cookie-parser"
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only your React app
  methods: 'GET, POST, PUT, DELETE, PATCH', // Include PATCH method
  credentials: true, // Allow credentials (cookies, etc.)
};



app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/submit', task_submissions);
app.use('/api/contact', contactRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  table()
});
