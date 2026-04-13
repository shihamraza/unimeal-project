const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool to PostgreSQL
// A pool manages multiple connections so the server doesn't
// have to open a new connection for every single query
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection when the server starts
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected at:", res.rows[0].now);
  }
});

module.exports = pool;
