require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

// Run locally with normal server
if (process.env.NODE_ENV !== 'production') {
  pool.getConnection()
    .then((conn) => {
      console.log('Connected to MySQL database');
      conn.release();

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
}

// Export app for Vercel
module.exports = app;