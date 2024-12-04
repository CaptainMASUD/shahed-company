import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Textarea, Button, Card } from "flowbite-react";

const SubmitTask = () => {
  const [taskId, setTaskId] = useState(""); // Stores task ID entered by the user
  const [submissionText, setSubmissionText] = useState(""); // Stores the text submitted by the user
  const [message, setMessage] = useState(null); // Stores success or error messages
  const [isLoading, setIsLoading] = useState(false); // Tracks the loading state for the form submission

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setMessage(null); // Reset any previous messages
    setIsLoading(true); // Set loading state while the request is being processed

    // Validate the form inputs
    if (!taskId.trim() || !submissionText.trim()) {
      setMessage({
        type: "error",
        text: "Please provide both Task ID and your response.",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Get the token from cookies
      const token = Cookies.get("authToken");

      // If no token is found, show an error message
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      // Make the POST request to submit the task response
      const response = await axios.post(
        `http://localhost:5000/api/submit/${taskId}`, // Send request to backend with task ID
        { submission_text: submissionText }, // Send the submission text in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Set the success message on successful submission
      setMessage({ type: "success", text: response.data.message });
      setTaskId(""); // Reset task ID input
      setSubmissionText(""); // Reset submission text input
    } catch (err) {
      // Handle any errors during the API request
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Submission failed",
      });
    } finally {
      setIsLoading(false); // Reset the loading state after request completion
    }
  };

  return (
    <Card className="mt-6">
      <h3 className="text-xl font-bold text-gray-800">Submit Task Response</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task ID Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task ID</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)} // Update task ID state
            placeholder="Enter Task ID"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Submission Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Response</label>
          <Textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)} // Update submission text state
            placeholder="Write your task response"
            required
          />
        </div>

        {/* Display message for success or error */}
        {message && (
          <p
            className={`text-sm mt-2 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Submit Button */}
        <Button type="submit" gradientDuoTone="tealToBlue" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"} {/* Display loading text if the form is submitting */}
        </Button>
      </form>
    </Card>
  );
};

export default SubmitTask;
