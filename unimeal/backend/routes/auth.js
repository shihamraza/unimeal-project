const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const auth = require("../middleware/auth");

// ==========================================
// POST /api/auth/register
// Creates a new user account
// ==========================================
router.post("/register", async (req, res) => {
  try {
    const { email, password, display_name, is_vegetarian, is_vegan, is_gluten_free } = req.body;

    // Check if email already exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "An account with this email already exists." });
    }

    // Hash the password (never store plain text!)
    // The 10 is the "salt rounds" - how many times it scrambles the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert the new user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, display_name, is_vegetarian, is_vegan, is_gluten_free)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, display_name, is_vegetarian, is_vegan, is_gluten_free`,
      [email, password_hash, display_name, is_vegetarian || false, is_vegan || false, is_gluten_free || false]
    );

    const user = result.rows[0];

    // Create a JWT token so the user is logged in immediately after registering
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        is_vegetarian: user.is_vegetarian,
        is_vegan: user.is_vegan,
        is_gluten_free: user.is_gluten_free,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// ==========================================
// POST /api/auth/login
// Logs in an existing user
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const user = result.rows[0];

    // Compare the provided password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Logged in successfully.",
      token,
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        is_vegetarian: user.is_vegetarian,
        is_vegan: user.is_vegan,
        is_gluten_free: user.is_gluten_free,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// ==========================================
// GET /api/auth/me
// Returns the current logged-in user's info
// Protected route (requires token)
// ==========================================
router.get("/me", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, display_name, is_vegetarian, is_vegan, is_gluten_free, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get user error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
