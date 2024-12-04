import db from '../config/db.js';

class TaskSubmission {
  constructor({ id, task_id, employee_id, submission_text, isAccepted, created_at }) {
    this.id = id;
    this.task_id = task_id;
    this.employee_id = employee_id;
    this.submission_text = submission_text;
    this.isAccepted = isAccepted || 0; // Default to 0 (not accepted)
    this.created_at = created_at;
  }

  // Save a new submission
  save() {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO task_submissions (task_id, employee_id, submission_text) VALUES (?, ?, ?)',
        [this.task_id, this.employee_id, this.submission_text],
        (err, result) => {
          if (err) return reject(new Error('Error saving submission: ' + err.message));
          this.id = result.insertId;
          resolve({ id: this.id, ...this });
        }
      );
    });
  }

  // Find submissions by task ID
  static findByTaskId(task_id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM task_submissions WHERE task_id = ?',
        [task_id],
        (err, results) => {
          if (err) return reject(new Error('Error retrieving submissions: ' + err.message));
          if (results.length === 0) return resolve([]);
          const submissions = results.map(row => new TaskSubmission(row));
          resolve(submissions);
        }
      );
    });
  }

  // Find submission by ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM task_submissions WHERE id = ?',
        [id],
        (err, results) => {
          if (err) return reject(new Error('Error retrieving submission: ' + err.message));
          if (results.length === 0) return resolve(null);
          resolve(new TaskSubmission(results[0]));
        }
      );
    });
  }

  // Find submission by ID and employee ID
  static findByIdAndEmployeeId(id, employee_id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM task_submissions WHERE id = ? AND employee_id = ?',
        [id, employee_id],
        (err, results) => {
          if (err) return reject(new Error('Error retrieving submission: ' + err.message));
          if (results.length === 0) return resolve(null);
          resolve(new TaskSubmission(results[0]));
        }
      );
    });
  }
  

  // Update a submission
  update({ submission_text, isAccepted }) {
    return new Promise((resolve, reject) => {
      const updates = [];
      const params = [];

      if (submission_text !== undefined) {
        updates.push('submission_text = ?');
        params.push(submission_text);
      }

      if (isAccepted !== undefined) {
        updates.push('isAccepted = ?');
        params.push(isAccepted);
      }

      if (updates.length === 0) {
        return reject(new Error('No fields provided for update'));
      }

      const queryStr = `UPDATE task_submissions SET ${updates.join(', ')} WHERE id = ?`;
      params.push(this.id);

      db.query(queryStr, params, (err, result) => {
        if (err) return reject(new Error('Error updating submission: ' + err.message));
        if (result.affectedRows === 0) return reject(new Error('Submission not found or no changes made'));
        resolve(result);
      });
    });
  }
}

export default TaskSubmission;
