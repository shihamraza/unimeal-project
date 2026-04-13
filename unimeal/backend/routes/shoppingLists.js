const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// All shopping list routes require login
router.use(auth);

// ==========================================
// POST /api/shopping-lists/generate/:mealPlanId
// Generate a shopping list from a meal plan
// This is the key feature - it aggregates all
// ingredients from all recipes in the plan
// ==========================================
router.post("/generate/:mealPlanId", async (req, res) => {
  try {
    const { mealPlanId } = req.params;

    // Verify ownership
    const plan = await pool.query(
      "SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2",
      [mealPlanId, req.user.id]
    );
    if (plan.rows.length === 0) {
      return res.status(404).json({ error: "Meal plan not found." });
    }

    // Delete existing shopping list for this plan (regenerate)
    await pool.query("DELETE FROM shopping_lists WHERE meal_plan_id = $1", [mealPlanId]);

    // Get all ingredients from all recipes in this meal plan
    // This query aggregates quantities for the same ingredient
    const ingredientsResult = await pool.query(
      `SELECT
         ri.ingredient_id,
         i.name,
         i.category,
         i.price_per_unit,
         ri.unit,
         SUM(ri.quantity) as total_quantity
       FROM meal_plan_entries mpe
       JOIN recipe_ingredients ri ON mpe.recipe_id = ri.recipe_id
       JOIN ingredients i ON ri.ingredient_id = i.id
       WHERE mpe.meal_plan_id = $1
       GROUP BY ri.ingredient_id, i.name, i.category, i.price_per_unit, ri.unit
       ORDER BY i.category, i.name`,
      [mealPlanId]
    );

    if (ingredientsResult.rows.length === 0) {
      return res.status(400).json({ error: "No recipes in this meal plan yet." });
    }

    // Calculate estimated total cost
    let estimatedTotal = 0;
    ingredientsResult.rows.forEach((item) => {
      if (item.price_per_unit) {
        // Rough cost estimate based on quantity and unit price
        const cost = (item.total_quantity / 100) * item.price_per_unit;
        estimatedTotal += cost;
      }
    });

    // Create the shopping list
    const listResult = await pool.query(
      "INSERT INTO shopping_lists (meal_plan_id, estimated_total) VALUES ($1, $2) RETURNING *",
      [mealPlanId, Math.round(estimatedTotal * 100) / 100]
    );

    const shoppingList = listResult.rows[0];

    // Insert all the items
    for (const item of ingredientsResult.rows) {
      const estimatedCost = item.price_per_unit
        ? Math.round((item.total_quantity / 100) * item.price_per_unit * 100) / 100
        : null;

      await pool.query(
        `INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, total_quantity, unit, estimated_cost)
         VALUES ($1, $2, $3, $4, $5)`,
        [shoppingList.id, item.ingredient_id, item.total_quantity, item.unit, estimatedCost]
      );
    }

    res.status(201).json({ message: "Shopping list generated.", shopping_list_id: shoppingList.id });
  } catch (err) {
    console.error("Generate shopping list error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// GET /api/shopping-lists/:mealPlanId
// Get the shopping list for a meal plan
// ==========================================
router.get("/:mealPlanId", async (req, res) => {
  try {
    const { mealPlanId } = req.params;

    // Verify ownership
    const plan = await pool.query(
      "SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2",
      [mealPlanId, req.user.id]
    );
    if (plan.rows.length === 0) {
      return res.status(404).json({ error: "Meal plan not found." });
    }

    // Get the shopping list
    const listResult = await pool.query(
      "SELECT * FROM shopping_lists WHERE meal_plan_id = $1",
      [mealPlanId]
    );

    if (listResult.rows.length === 0) {
      return res.status(404).json({ error: "No shopping list generated yet. Generate one first." });
    }

    const list = listResult.rows[0];

    // Get all items grouped by category
    const itemsResult = await pool.query(
      `SELECT sli.*, i.name, i.category
       FROM shopping_list_items sli
       JOIN ingredients i ON sli.ingredient_id = i.id
       WHERE sli.shopping_list_id = $1
       ORDER BY i.category, i.name`,
      [list.id]
    );

    list.items = itemsResult.rows;

    res.json(list);
  } catch (err) {
    console.error("Get shopping list error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// PATCH /api/shopping-lists/items/:itemId/check
// Toggle an item as checked/unchecked
// ==========================================
router.patch("/items/:itemId/check", async (req, res) => {
  try {
    const { itemId } = req.params;

    const result = await pool.query(
      "UPDATE shopping_list_items SET is_checked = NOT is_checked WHERE id = $1 RETURNING *",
      [itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.json({ message: "Item updated.", item: result.rows[0] });
  } catch (err) {
    console.error("Check item error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
