import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, address, phoneNo, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, address, phoneNo, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check if the user is either an admin or an employee
      if (user.isAdmin !== 1 && user.isEmployee !== 1) {
        return res.status(403).json({ message: 'Access denied: Must be an admin or employee' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin, isEmployee: user.isEmployee },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Map `isAdmin` and `isEmployee` to true/false based on their values (1/0)
      const { password: _, isAdmin, isEmployee, ...userData } = user;
      const response = {
        ...userData,
        isAdmin: isAdmin === 1,    // Convert 1 to true, 0 to false
        isEmployee: isEmployee === 1 // Convert 1 to true, 0 to false
      };
  
      // Send token as a cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: true, // Set to true if using HTTPS
        sameSite: 'Strict',
        maxAge: 3600000, // 1 hour expiry
      });
  
      // Send response with user data (excluding password) and token
      res.status(200).json({
        message: 'Login successful',
        user: response,
        token: token,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in user', error: err.message });
    }
  };

  export const makeEmployee = async (req, res) => {
    try {
      const { userId } = req.params;
      let user = await User.findById(userId);
      
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Wrap the plain object in the User instance
      user = new User(user); // Create an instance of User
      
      user.isEmployee = 1;  // Mark the user as an employee
      await user.update();   // Call the update method on the instance
  
      res.status(200).json({ message: 'User promoted to employee' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  

// CRUD operations for users (admin only)
// Get all employees or employee-specific details
export const getAllEmployees = async (req, res) => {
    try {
      const user = req.user; // The authenticated user
  
      // Check if the user is an admin
      if (user.isAdmin) {
        // Admin can see all employee details
        const employees = await User.findEmployees();
        return res.status(200).json(employees);
      }
  
      // If the user is an employee, only allow seeing their own name and phone number
      if (user.isEmployee) {
        const employees = await User.findEmployees();
        
        // Filter out only the `name` and `phoneNo` of other employees
        const employeeDetails = employees.map(emp => ({
          name: emp.name,
          phoneNo: emp.phoneNo,
        }));
  
        return res.status(200).json(employeeDetails);
      }
  
      // If the user is neither an admin nor an employee, return an error
      return res.status(403).json({ message: 'Access denied: Must be an admin or employee' });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

export const logout = (req, res) => {
    try {
      // Clear the authToken cookie by setting it to expire in the past
      res.cookie('authToken', '', {
        httpOnly: true,
        secure: true,  // Set to true if using HTTPS
        sameSite: 'Strict',
        expires: new Date(0),  // Expiry in the past
      });
  
      // Send a response indicating the user has been logged out
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ message: 'Error logging out', error: err.message });
    }
  };
  

// Additional methods can include deleteUser, updateUser, etc.
