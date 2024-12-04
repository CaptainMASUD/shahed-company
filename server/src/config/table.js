import db from './db.js';

const initializeDatabase = () => {
  // Users table creation
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      phoneNo VARCHAR(15),
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      isAdmin TINYINT DEFAULT 0,
      isEmployee TINYINT DEFAULT 0
    );
  `;

  const createTasksTable = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT 0,  -- Default to 0 for tasks assigned to all employees
    description TEXT NOT NULL,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    details TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;


// Modify the table creation for task_submissions to include isAccepted
const createTaskSubmissionsTable = `
  CREATE TABLE IF NOT EXISTS task_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    employee_id INT NOT NULL,
    submission_text TEXT NOT NULL,
    isAccepted TINYINT DEFAULT 0, -- Default to 0 (not accepted)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

const createContactSubmissionsTable = `
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

db.query(createContactSubmissionsTable, (err) => {
  if (err) {
    console.error('Failed to create Contact Submissions table:', err);
  } else {
    console.log('Contact Submissions table ready');
  }
});


db.query(createTaskSubmissionsTable, (err) => {
  if (err) {
    console.error('Failed to create Task Submissions table:', err);
  } else {
    console.log('Task Submissions table ready');
  }
});


  // Execute queries to create tables
  db.query(createUsersTable, (err) => {
    if (err) {
      console.error('Failed to create Users table:', err);
    } else {
      console.log('Users table ready');
    }
  });

  db.query(createTasksTable, (err) => {
    if (err) {
      console.error('Failed to create Tasks table:', err);
    } else {
      console.log('Tasks table ready');
    }
  });
};

export default initializeDatabase;
