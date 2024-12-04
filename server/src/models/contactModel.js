import db from '../config/db.js';

// Model to save a contact submission
export const createContactSubmission = (name, email, message) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)`;
    db.query(query, [name, email, message], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
// Model to fetch all contact submissions
export const getAllContactSubmissions = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM contact_submissions`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
