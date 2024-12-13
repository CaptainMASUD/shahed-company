import TaskSubmission from '../models/TaskSubmission.model.js';

export const submitTaskResponse = async (req, res) => {
  try {
    const { task_id } = req.params; // Task ID from the route parameters
    const { submission_text, employee_id } = req.body; // Submission text and employee ID from the request body

    // Validate input
    if (!submission_text || typeof submission_text !== 'string' || submission_text.trim() === '') {
      return res.status(400).json({ message: 'Submission text must be a non-empty string.' });
    }

    if (!employee_id) {
      return res.status(400).json({ message: 'Employee ID is required.' });
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

    const submission = await TaskSubmission.findById(submission_id);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    // Update the submission fields without restrictions
    await submission.update({ submission_text, isAccepted });
    res.status(200).json({ message: 'Task submission updated successfully.', submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
