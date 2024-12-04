import React, { useState } from 'react';
import { FaTasks, FaPlus, FaClipboardList } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import CreateTask from './TaskForm';
import TasksList from './TaskList';
import SubmissionsManagement from './submissionStatus';
import ContactMessages from './ContactMesseage';

function Admin() {
  const [selectedSection, setSelectedSection] = useState('createTask');

  // Render the corresponding section based on the selected option
  const renderContent = () => {
    switch (selectedSection) {
      case 'createTask':
        return <CreateTask />;
      case 'tasksList':
        return <TasksList />;
      case 'submissionsManagement':
        return <SubmissionsManagement />;
      case 'contactMessages':
        return <ContactMessages />;
      default:
        return <CreateTask />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li>
            <button
              onClick={() => setSelectedSection('createTask')}
              className={`w-full text-left py-2 px-4 hover:bg-teal-500 rounded-lg flex items-center ${selectedSection === 'createTask' ? 'bg-teal-500 text-white' : 'text-gray-300'}`}
            >
              <FaPlus className={`mr-3 ${selectedSection === 'createTask' ? 'text-white' : 'text-teal-500'}`} />
              Create Task
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection('tasksList')}
              className={`w-full text-left py-2 px-4 hover:bg-teal-500 rounded-lg flex items-center ${selectedSection === 'tasksList' ? 'bg-teal-500 text-white' : 'text-gray-300'}`}
            >
              <FaTasks className={`mr-3 ${selectedSection === 'tasksList' ? 'text-white' : 'text-teal-500'}`} />
              View Tasks
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection('submissionsManagement')}
              className={`w-full text-left py-2 px-4 hover:bg-teal-500 rounded-lg flex items-center ${selectedSection === 'submissionsManagement' ? 'bg-teal-500 text-white' : 'text-gray-300'}`}
            >
              <FaClipboardList className={`mr-3 ${selectedSection === 'submissionsManagement' ? 'text-white' : 'text-teal-500'}`} />
              Manage Submissions
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedSection('contactMessages')}
              className={`w-full text-left py-2 px-4 hover:bg-teal-500 rounded-lg flex items-center ${selectedSection === 'contactMessages' ? 'bg-teal-500 text-white' : 'text-gray-300'}`}
            >
              <MdEmail className={`mr-3 ${selectedSection === 'contactMessages' ? 'text-white' : 'text-teal-500'}`} />
              Contact Messages
            </button>
          </li>
        </ul>
      </div>

      {/* Right Side Content */}
      <div className="w-3/4 p-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default Admin;
