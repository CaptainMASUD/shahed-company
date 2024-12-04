import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { Button, Label, TextInput, Card } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import {
  loginStart,
  loginSuccess,
  loginFailed,
} from "../../App/EmployeeSlice/employeeSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate hook
  const { loading, error, currentUser } = useSelector(
    (state) => state.employee || {}
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const { user, token } = response.data;

      // Save the token in cookies (instead of localStorage)
      Cookies.set("authToken", token, { expires: 7 }); // Expires in 7 days

      dispatch(loginSuccess(user));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // After login is successful, navigate to the home route
      navigate("/"); // Navigate to home ("/") route
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      dispatch(loginFailed(errorMessage));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" className="flex items-center text-gray-700">
              <FaUser className="mr-2" />
              Username
            </Label>
            <TextInput
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password" className="flex items-center text-gray-700">
              <FaLock className="mr-2" />
              Password
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          {showSuccessMessage && (
            <p className="text-green-600 text-sm mt-2">
              Login successful! Welcome, {currentUser?.name || "User"}.
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
