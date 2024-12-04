import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Alert } from 'flowbite-react'; // Import Alert from Flowbite

const TaskStatusUpdater = () => {
  const [taskId, setTaskId] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [statusValue, setStatusValue] = useState('0'); // String '0' or '1'
  const [alertMessage, setAlertMessage] = useState(null); // Updated for Flowbite Alert
  const [loading, setLoading] = useState(false);

  // Fetch submissions when taskId changes
  useEffect(() => {
    if (taskId) {
      fetchSubmissions();
    }
  }, [taskId]);

  // Fetch submissions for a specific task
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/submit/${taskId}`, {
        withCredentials: true,
      });
      setSubmissions(res.data);
      setAlertMessage(null);
    } catch (error) {
      console.error(error);
      setAlertMessage('No submissions found for this task.');
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  // Update the status of a submission
  const updateSubmissionStatus = async (submissionId) => {
    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/submit/${submissionId}`,
        { isAccepted: Number(statusValue) }, // Convert statusValue to number
        { withCredentials: true }
      );

      // Show success message
      setAlertMessage('Submission status updated successfully!');
      fetchSubmissions(); // Refresh submissions
    } catch (error) {
      console.error(error);
      setAlertMessage('Failed to update submission status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Update Task Submission Acceptance</h2>

      {/* Alert Section */}
      {alertMessage && (
        <div className="mb-6">
          <Alert
            color={alertMessage.includes('success') ? 'success' : 'failure'} // Dynamic color
            onDismiss={() => setAlertMessage(null)} // Dismiss alert
          >
            {alertMessage}
          </Alert>
        </div>
      )}

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
          onClick={fetchSubmissions}
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
              <li
                key={submission.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    <strong>Submission ID:</strong> {submission.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted on: {new Date(submission.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Submission Text:</strong> {submission.submission_text}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Status:</strong>
                  {submission.isAccepted ? (
                    <span className="text-teal-500 flex items-center">
                      <FaCheckCircle className="mr-2" /> Accepted
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle className="mr-2" /> Not Accepted
                    </span>
                  )}
                </p>

                {/* Update Acceptance Status */}
                <div>
                  <label className="block text-sm font-medium mb-2">Update Acceptance Status</label>
                  <select
                    value={statusValue}
                    onChange={(e) => setStatusValue(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4 transition duration-300"
                  >
                    <option value="0">Not Accepted</option>
                    <option value="1">Accepted</option>
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
