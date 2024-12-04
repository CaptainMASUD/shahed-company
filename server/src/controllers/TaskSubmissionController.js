import TaskSubmission from '../models/TaskSubmission.model.js';

// Submit or reply to a task
export const submitTaskResponse = async (req, res) => {
  try {
    const { task_id } = req.params; // Task ID from the route parameters
    const { submission_text } = req.body; // Submission text from the request body
    const employee_id = req.user.id; // Authenticated user's ID

    // Validate input
    if (!submission_text || typeof submission_text !== 'string' || submission_text.trim() === '') {
      return res.status(400).json({ message: 'Submission text must be a non-empty string.' });
    }

    const submission = new TaskSubmission({ task_id, employee_id, submission_text });
    const result = await submission.save();

    res.status(201).json({ message: 'Task submission successful', submission: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all submissions for a specific task
export const getTaskSubmissions = async (req, res) => {
  try {
    const { task_id } = req.params; // Task ID from the route parameters

    // Fetch all submissions for the specified task
    const submissions = await TaskSubmission.findByTaskId(task_id);

    if (submissions.length === 0) {
      return res.status(404).json({ message: 'No submissions found for this task.' });
    }

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task submission
export const updateTaskSubmission = async (req, res) => {
  try {
    const { submission_id } = req.params; // Submission ID from the route parameters
    const { submission_text, isAccepted } = req.body; // Fields to update from the request body
    const { id: user_id, role } = req.user; // Authenticated user's ID and role

    const submission = await TaskSubmission.findById(submission_id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    // Role-based update permissions
    if (role === 'employee') {
      if (submission.employee_id !== user_id) {
        return res.status(403).json({ message: 'You are not authorized to update this submission.' });
      }

      // Employees cannot modify `isAccepted`
      if (isAccepted !== undefined) {
        return res.status(403).json({ message: 'Employees cannot update acceptance status.' });
      }

      // Update employee's own submission text
      await submission.update({ submission_text });
      return res.status(200).json({ message: 'Task submission updated successfully.', submission });
    }

    if (role === 'admin') {
      // Admins can update `isAccepted` or `submission_text`
      await submission.update({ submission_text, isAccepted });
      return res.status(200).json({ message: 'Task submission updated successfully.', submission });
    }

    res.status(403).json({ message: 'Unauthorized access.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

