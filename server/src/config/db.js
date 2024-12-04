import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '', // Ensure to use password from env if available
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL Database connected...');
});

export default db;