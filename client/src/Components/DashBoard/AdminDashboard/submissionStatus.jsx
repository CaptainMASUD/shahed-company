import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icons for accepted and not accepted

const TaskStatusUpdater = () => {
  const [taskId, setTaskId] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false); // Replacing 'status' with 'isAccepted'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch submissions for a specific task
  const searchTaskSubmissions = async () => {
    if (!taskId) {
      return setMessage('Please enter a valid task ID.');
    }

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/submit/${taskId}`, {
        withCredentials: true,
      });
      setSubmissions(res.data);
      setMessage('');
    } catch (error) {
      setMessage('No submissions found for this task.');
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  // Update the isAccepted status of a submission
  const updateSubmissionStatus = async (submissionId) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/submit/${submissionId}`,
        { isAccepted }, // Send the new isAccepted value
        { withCredentials: true }
      );
      setMessage('Submission status updated successfully');
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((sub) =>
          sub.id === submissionId ? { ...sub, isAccepted: res.data.isAccepted } : sub
        )
      ); // Update the 'isAccepted' field for the updated submission
    } catch (error) {
      setMessage('Failed to update submission status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Update Task Submission Acceptance</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      {/* Input and Search Task */}
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Enter Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        />
        <button
          onClick={searchTaskSubmissions}
          className="w-32 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none transition duration-300"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Task Submissions */}
      {submissions.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Task Submissions</h3>
          <ul>
            {submissions.map((submission) => (
              <li key={submission.id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300">
                <div className="flex justify-between items-center mb-2">
                  <p><strong>Submission ID:</strong> {submission.id}</p>
                  <p className="text-sm text-gray-500">Submitted on: {new Date(submission.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-700 mb-2"><strong>Submission Text:</strong> {submission.submission_text}</p>
                <p className="text-gray-700 mb-4">
                  <strong>Status:</strong> 
                  {submission.isAccepted ? (
                    <span className="text-teal-500 flex items-center"><FaCheckCircle className="mr-2" /> Accepted</span>
                  ) : (
                    <span className="text-red-500 flex items-center"><FaTimesCircle className="mr-2" /> Not Accepted</span>
                  )}
                </p>

                {/* Update Acceptance Status */}
                <div>
                  <label className="block text-sm font-medium mb-2">Update Acceptance Status</label>
                  <select
                    value={isAccepted.toString()} // Use toString() to handle 'true'/'false' as string in the select
                    onChange={(e) => setIsAccepted(e.target.value === 'true')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 transition duration-300"
                  >
                    <option value="false">Not Accepted</option>
                    <option value="true">Accepted</option>
                  </select>
                  <button
                    onClick={() => updateSubmissionStatus(submission.id)}
                    className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none transition duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Status'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskStatusUpdater;
