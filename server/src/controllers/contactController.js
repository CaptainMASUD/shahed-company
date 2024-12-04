import { createContactSubmission, getAllContactSubmissions } from '../models/contactModel.js';

// Controller to handle contact form submission
export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Insert the contact submission into the database
    await createContactSubmission(name, email, message);
    return res.status(200).json({ message: "Your message has been sent successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send message." });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const submissions = await getAllContactSubmissions();
    return res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch contact submissions." });
  }
};
