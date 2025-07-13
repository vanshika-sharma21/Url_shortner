require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');
const PORT = process.env.PORT || 5000;

// Test DB connection
pool.getConnection()
  .then(conn => {
    console.log('Connected to MySQL database');
    conn.release();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });