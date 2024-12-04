import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShippingFast, FaBox, FaIndustry } from "react-icons/fa";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNo: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [navigateMessage, setNavigateMessage] = useState(""); // State for the navigate message

  const navigate = useNavigate(); // Initialize navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");
    setNavigateMessage(""); // Reset the navigation message

    try {
      // Make API call to register the user
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      // Handle the success response
      setMessage(response.data.message);
      setLoading(false);

      // Set the message informing the user about navigation
      setNavigateMessage("Registration successful! Redirecting to login page...");

      // Navigate to the login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Wait for 2 seconds before navigating to give the user time to read the message
    } catch (err) {
      // Handle the error response
      setError(err.response?.data?.error || "An error occurred during registration");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden"
    >
      <div className="w-full max-w-7xl p-4 md:p-0 flex bg-white shadow-lg rounded-lg  flex-col md:flex-row">
        {/* Left side - Company Details */}
        <div className="md:w-1/2 w-full  bg-teal-600 text-white p-8 flex flex-col items-start justify-center space-y-6">
          <h1 className="text-4xl font-bold">Shahded Company Limited</h1>
          <p className="text-lg">Export & Import Company</p>
          <p className="text-sm">We specialize in export and import services for various industries. Join us today!</p>

          {/* Shipping Icons */}
          <div className="flex space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <FaShippingFast size={32} />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBox size={32} />
              <span>Quality Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaIndustry size={32} />
              <span>Global Import</span>
            </div>
          </div>
        </div>

        {/* Right side - Registration Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Two inputs per row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center text-gray-700">
                  <FaUser className="mr-2" />
                  Name
                </Label>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="username" className="flex items-center text-gray-700">
                  <FaUser className="mr-2" />
                  Username
                </Label>
                <TextInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-2" />
                  Email
                </Label>
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phoneNo" className="flex items-center text-gray-700">
                  <FaPhone className="mr-2" />
                  Phone Number
                </Label>
                <TextInput
                  id="phoneNo"
                  name="phoneNo"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address" className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2" />
                  Address
                </Label>
                <TextInput
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  required
                  value={formData.address}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  placeholder="Choose a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          {/* Display success message */}
          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

          {/* Display error message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Display navigate message */}
          {navigateMessage && <p className="text-blue-600 text-sm mt-2">{navigateMessage}</p>}

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationForm;
