import React, { useState } from 'react';
import AllTasks from './AllTasks';
import SubmitTask from './SubmitTask';
import { FaTasks, FaPlus } from 'react-icons/fa';
import { GoTasklist } from "react-icons/go";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

function EmployeeDashboard() {
  const [viewTasks, setViewTasks] = useState(true);  // State to toggle between components

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Toggle Buttons - Side by Side */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setViewTasks(true)}
            className={`px-2  text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none transition-colors ${
              viewTasks ? 'bg-teal-600' : ''
            }`}
          >
            <GoTasklist className="mr-2 inline-block  w-5 h-5" />
            View Tasks
          </button>

          {/* <button
            onClick={() => setViewTasks(false)}
            className={`px-4 py-2 text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none transition-colors ${
              !viewTasks ? 'bg-teal-600' : ''
            }`}
          >
            <IoCheckmarkDoneCircleSharp className="mr-2 inline-block w-5 h-5" />
            Submit Task
          </button> */}
        </div>

        {/* Conditionally Render Components - Full Width */}
        <div className="w-full">
          {viewTasks ? (
            <div className="w-full">
              <AllTasks />
            </div>
          ) : (
            <div className="w-full">
              <SubmitTask />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
