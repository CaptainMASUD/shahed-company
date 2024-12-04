import db from "../config/db.js";

class User {
  constructor({ id, name, address, phoneNo, username, email, password, isAdmin = 0, isEmployee = 0 }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNo = phoneNo;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.isEmployee = isEmployee;
  }

  // Save a new user to the database
  save() {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users SET ?', this, (err, result) => {
        if (err) {
          console.error('Error during query execution:', err);
          return reject(err);
        }
        console.log('Query result:', result);
        this.id = result.insertId; // Set the user ID after saving
        resolve(result);
      });
    });
  }
  

  // Find a user by username
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) reject(err);
        resolve(result[0]); // Return the first matching user
      });
    });
  }

  // Find a user by ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        resolve(result[0]); // Return the user if found
      });
    });
  }

  // Update user details
  update() {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET name = ?, address = ?, phoneNo = ?, username = ?, email = ?, password = ?, isAdmin = ?, isEmployee = ? WHERE id = ?',
        [this.name, this.address, this.phoneNo, this.username, this.email, this.password, this.isAdmin, this.isEmployee, this.id],
        (err, result) => {
          if (err) reject(err);
          resolve(result); // Return the result of the update operation
        }
      );
    });
  }

  // Delete a user by ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        resolve(result); // Return the result of the delete operation
      });
    });
  }

  // Find all employees
  static findEmployees() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE isEmployee = 1', (err, result) => {
        if (err) reject(err);
        resolve(result); // Return all employees
      });
    });
  }
}

export default User;
