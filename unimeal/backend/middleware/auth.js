const jwt = require("jsonwebtoken");
require("dotenv").config();

// This middleware checks if the user is logged in
// It runs BEFORE the actual route handler
// If the token is valid, it adds user info to req.user
// If not, it sends a 401 Unauthorized response

const auth = (req, res, next) => {
  // Get the token from the Authorization header
  // Format: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided. Please log in." });
  }

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user info to the request object so routes can use it
    req.user = decoded;
    next(); // Continue to the actual route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = auth;
