const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// All meal plan routes require login
router.use(auth);

// ==========================================
// POST /api/meal-plans
// Create a new meal plan for a specific week
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { week_start } = req.body; // expects "2026-02-23" (a Monday)

    // Check if a plan already exists for this week
    const existing = await pool.query(
      "SELECT * FROM meal_plans WHERE user_id = $1 AND week_start = $2",
      [req.user.id, week_start]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: "Plan already exists for this week.", meal_plan: existing.rows[0] });
    }

    const result = await pool.query(
      "INSERT INTO meal_plans (user_id, week_start) VALUES ($1, $2) RETURNING *",
      [req.user.id, week_start]
    );

    res.status(201).json({ message: "Meal plan created.", meal_plan: result.rows[0] });
  } catch (err) {
    console.error("Create meal plan error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// GET /api/meal-plans/:week_start
// Get a meal plan with all its entries
// ==========================================
router.get("/:week_start", async (req, res) => {
  try {
    const { week_start } = req.params;

    // Get the meal plan
    const planResult = await pool.query(
      "SELECT * FROM meal_plans WHERE user_id = $1 AND week_start = $2",
      [req.user.id, week_start]
    );

    if (planResult.rows.length === 0) {
      return res.status(404).json({ error: "No meal plan found for this week." });
    }

    const plan = planResult.rows[0];

    // Get all entries with recipe details
    const entriesResult = await pool.query(
      `SELECT mpe.id, mpe.day_of_week, mpe.meal_slot,
              r.id as recipe_id, r.title, r.cost_per_serving, r.prep_time, r.difficulty, r.image_url
       FROM meal_plan_entries mpe
       JOIN recipes r ON mpe.recipe_id = r.id
       WHERE mpe.meal_plan_id = $1
       ORDER BY
         CASE mpe.day_of_week
           WHEN 'monday' THEN 1 WHEN 'tuesday' THEN 2 WHEN 'wednesday' THEN 3
           WHEN 'thursday' THEN 4 WHEN 'friday' THEN 5 WHEN 'saturday' THEN 6 WHEN 'sunday' THEN 7
         END,
         CASE mpe.meal_slot
           WHEN 'breakfast' THEN 1 WHEN 'lunch' THEN 2 WHEN 'dinner' THEN 3
         END`,
      [plan.id]
    );

    // Calculate total estimated cost for the week
    const totalCost = entriesResult.rows.reduce((sum, entry) => sum + parseFloat(entry.cost_per_serving), 0);

    res.json({
      ...plan,
      entries: entriesResult.rows,
      total_cost: Math.round(totalCost * 100) / 100,
    });
  } catch (err) {
    console.error("Get meal plan error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// POST /api/meal-plans/:id/entries
// Add a recipe to a meal plan slot
// ==========================================
router.post("/:id/entries", async (req, res) => {
  try {
    const meal_plan_id = req.params.id;
    const { recipe_id, day_of_week, meal_slot } = req.body;

    // Verify the meal plan belongs to this user
    const plan = await pool.query(
      "SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2",
      [meal_plan_id, req.user.id]
    );
    if (plan.rows.length === 0) {
      return res.status(404).json({ error: "Meal plan not found." });
    }

    // Check if the slot is already taken
    const existing = await pool.query(
      "SELECT id FROM meal_plan_entries WHERE meal_plan_id = $1 AND day_of_week = $2 AND meal_slot = $3",
      [meal_plan_id, day_of_week, meal_slot]
    );

    if (existing.rows.length > 0) {
      // Replace the existing entry
      await pool.query(
        "UPDATE meal_plan_entries SET recipe_id = $1 WHERE id = $2",
        [recipe_id, existing.rows[0].id]
      );
      res.json({ message: "Meal slot updated." });
    } else {
      // Insert new entry
      await pool.query(
        "INSERT INTO meal_plan_entries (meal_plan_id, recipe_id, day_of_week, meal_slot) VALUES ($1, $2, $3, $4)",
        [meal_plan_id, recipe_id, day_of_week, meal_slot]
      );
      res.status(201).json({ message: "Recipe added to meal plan." });
    }
  } catch (err) {
    console.error("Add entry error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// DELETE /api/meal-plans/:id/entries/:entryId
// Remove a recipe from a meal plan slot
// ==========================================
router.delete("/:id/entries/:entryId", async (req, res) => {
  try {
    const { id, entryId } = req.params;

    // Verify ownership
    const plan = await pool.query(
      "SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (plan.rows.length === 0) {
      return res.status(404).json({ error: "Meal plan not found." });
    }

    await pool.query("DELETE FROM meal_plan_entries WHERE id = $1 AND meal_plan_id = $2", [entryId, id]);
    res.json({ message: "Entry removed." });
  } catch (err) {
    console.error("Delete entry error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
