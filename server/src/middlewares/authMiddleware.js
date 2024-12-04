import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// General Authentication Middleware: Verifies JWT from cookies and sets req.user
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.authToken; 

    if (!token) return res.status(403).json({ message: 'Access denied, token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin Authorization Middleware: Requires user to be an admin
export const adminAuthMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Employee or Admin Authorization Middleware: Requires user to be either an employee or admin
export const employeeAuthMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || (!user.isEmployee && !user.isAdmin)) {
      return res.status(403).json({ message: 'Employee or admin access required' });
    }
    req.user = user; // Pass the user object along for further processing
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default { authMiddleware, adminAuthMiddleware, employeeAuthMiddleware };
