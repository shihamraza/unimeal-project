const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import route files
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const mealPlanRoutes = require("./routes/mealPlans");
const shoppingListRoutes = require("./routes/shoppingLists");

const app = express();

// ==========================================
// MIDDLEWARE
// These run on every request before the routes
// ==========================================

// Parse JSON request bodies (so we can read req.body)
app.use(express.json());

// Allow the React frontend (port 3000) to talk to this backend (port 5000)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// ==========================================
// ROUTES
// Each file handles a group of endpoints
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/meal-plans", mealPlanRoutes);
app.use("/api/shopping-lists", shoppingListRoutes);

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "UniMeal API is running." });
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`UniMeal server running on http://localhost:${PORT}`);
});
