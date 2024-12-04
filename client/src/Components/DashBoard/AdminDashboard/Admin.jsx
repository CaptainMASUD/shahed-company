import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaClipboardCheck, FaInbox } from 'react-icons/fa';
import { MdAddTask, MdEmail } from 'react-icons/md';
import CreateTask from './TaskForm';
import TasksList from './TaskList';
import SubmissionsManagement from './submissionStatus';
import ContactMessages from './ContactMesseage';

function Admin() {
  const [selectedSection, setSelectedSection] = useState('createTask');

  const menuItems = [
    { id: 'createTask', label: 'Create Task', icon: MdAddTask },
    { id: 'tasksList', label: 'View Tasks', icon: FaTasks },
    { id: 'submissionsManagement', label: 'Manage Submissions', icon: FaClipboardCheck },
    { id: 'contactMessages', label: 'Contact Messages', icon: FaInbox },
  ];

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gray-800 text-white p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg flex items-center transition-colors duration-200 ${
                    selectedSection === item.id
                      ? 'bg-teal-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className={`mr-3 text-xl ${
                    selectedSection === item.id ? 'text-white' : 'text-teal-500'
                  }`} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
         
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}

export default Admin;

