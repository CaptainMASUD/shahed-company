import db from '../config/db.js';

class Task {
  constructor({ id, user_id = 0, description, status = 'pending', details }) {
    this.id = id;
    this.user_id = user_id;
    this.description = description;
    this.status = status;
    this.details = details;
  }

  // Save a new task to the database
  save() {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO tasks SET ?', this, (err, result) => {
        if (err) {
          console.error('Failed to insert task:', err.message);
          return reject(err);
        }
        this.id = result.insertId;
        resolve(result);
      });
    });
  }

  // Find all tasks for all employees
  static findForAllEmployees() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks', (err, result) => {  // No WHERE clause to get all tasks
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  // Find tasks by user ID
  static findByUserId(user_id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM tasks WHERE user_id = ? OR user_id IS NULL', 
        [user_id], 
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  // Find a task by ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        if (result.length === 0) {
          return reject(new Error('Task not found'));
        }
        resolve(result[0]); // Return the first task found
      });
    });
  }

  // Update a task by ID
  update() {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE tasks SET description = ?, status = ?, details = ? WHERE id = ?',
        [this.description, this.status, this.details, this.id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  // Delete a task by ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default Task;
