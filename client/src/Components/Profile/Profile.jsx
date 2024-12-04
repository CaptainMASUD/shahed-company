import React from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaUserTie, FaUser, FaPhone, FaEnvelope, FaSuitcase, FaClock } from "react-icons/fa";
import { Card } from "flowbite-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.employee || {});

  if (!currentUser) {
    return <div>Loading...</div>; // Handle if user data is not available
  }

  const { name, phoneNo, username, email, isEmployee, isAdmin } = currentUser;

  // Determine which icon to show above the username
  const UserIcon = isAdmin ? FaUserShield : isEmployee ? FaUserTie : FaUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Start with opacity 0 and position above
      animate={{ opacity: 1, y: 0 }} // Animate to full opacity and normal position
      transition={{ duration: 0.5 }} // Smooth transition over 0.5 seconds
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <Card className="w-full max-w-4xl p-6 my-8 border-l-4 border-teal-500">
        {/* User icon above username */}
        <div className="text-center mb-4">
          <UserIcon className="text-6xl text-teal-600 mx-auto" />
        </div>

        {/* Username at top-center */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{username}</h2>
        </div>

        <div className="space-y-4">
          {/* Name and Email on the same row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaUser className="mr-2 text-teal-600" />
              <span className="font-semibold">{name}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-teal-600" />
              <span className="text-sm">{email}</span>
            </div>
          </div>

          {/* Phone Number on the next line */}
          <div className="flex items-center">
            <FaPhone className="mr-2 text-teal-600" />
            <span className="text-sm">{phoneNo}</span>
          </div>

          {/* Employee and Admin Status on the last line */}
          <div className="mt-4">
            <div className="flex space-x-4">
              {isEmployee && (
                <div className="flex items-center">
                  <FaSuitcase className="mr-2 text-teal-600" />
                  <span className="text-sm font-semibold text-green-500">Employee</span>
                </div>
              )}

              {isAdmin && (
                <div className="flex items-center">
                  <FaUserShield className="mr-2 text-teal-600" />
                  <span className="text-sm font-semibold text-blue-500">Admin</span>
                </div>
              )}
            </div>
          </div>

          {/* Company Introduction */}
          <div className="mt-8 text-gray-700">
            <h3 className="text-xl font-semibold mb-2">About Shahed Company Limited</h3>
            <p className="text-sm">
              Shahed Company Limited is a leading name in the Import and Export industry. We specialize in
              global trade, offering quality products and services to businesses worldwide. Our core values of
              integrity, reliability, and customer satisfaction drive everything we do.
            </p>
          </div>

          {/* Tips for Employee/Admin */}
          <div className="mt-6 text-gray-700">
            <h3 className="text-xl font-semibold mb-2">Tips for Success</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {isEmployee && (
                <li>Always strive for excellence in customer service and product quality.</li>
              )}
              {isAdmin && (
                <li>Lead by example and empower your team to succeed in their roles.</li>
              )}
              <li>Keep learning and improving. The global trade industry is always evolving!</li>
            </ul>
          </div>

          {/* Working Hours and Operational Details */}
          <div className="mt-6 text-gray-700">
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p className="text-sm">
              Our office operates Monday to Friday, from 9:00 AM to 6:00 PM. However, our logistics and
              shipping services are available 24/7 to meet the needs of our international clients.
            </p>
            <div className="flex items-center mt-2">
              <FaClock className="mr-2 text-teal-600" />
              <span className="text-sm">Office Hours: 9:00 AM - 6:00 PM (Mon - Fri)</span>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-8 text-gray-700 text-center">
            <h3 className="text-xl font-semibold mb-2">Quote of the Day</h3>
            <p className="italic text-sm">
              "Success in business requires training, discipline, and hard work. Together, we can achieve great
              things at Shahed Company Limited."
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Profile;
