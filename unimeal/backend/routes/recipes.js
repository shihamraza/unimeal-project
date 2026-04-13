const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// ==========================================
// GET /api/recipes/saved/list
// IMPORTANT: This must be BEFORE /:id route
// otherwise Express thinks "saved" is an id
// ==========================================
router.get("/saved/list", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, sr.saved_at
       FROM saved_recipes sr
       JOIN recipes r ON sr.recipe_id = r.id
       WHERE sr.user_id = $1
       ORDER BY sr.saved_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get saved recipes error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// GET /api/recipes
// Browse all recipes with optional filters
// ==========================================
router.get("/", async (req, res) => {
  try {
    const { cuisine, difficulty, max_cost, max_time, is_vegetarian, is_vegan, is_gluten_free, search } = req.query;

    let query = "SELECT * FROM recipes WHERE 1=1";
    const params = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      query += ` AND (LOWER(title) LIKE $${paramCount} OR LOWER(description) LIKE $${paramCount})`;
      params.push(`%${search.toLowerCase()}%`);
    }

    if (cuisine) {
      paramCount++;
      query += ` AND LOWER(cuisine) = $${paramCount}`;
      params.push(cuisine.toLowerCase());
    }

    if (difficulty) {
      paramCount++;
      query += ` AND difficulty = $${paramCount}`;
      params.push(difficulty);
    }

    if (max_cost) {
      paramCount++;
      query += ` AND cost_per_serving <= $${paramCount}`;
      params.push(parseFloat(max_cost));
    }

    if (max_time) {
      paramCount++;
      query += ` AND prep_time <= $${paramCount}`;
      params.push(parseInt(max_time));
    }

    if (is_vegetarian === "true") {
      query += " AND is_vegetarian = TRUE";
    }

    if (is_vegan === "true") {
      query += " AND is_vegan = TRUE";
    }

    if (is_gluten_free === "true") {
      query += " AND is_gluten_free = TRUE";
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Get recipes error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// GET /api/recipes/:id
// Get a single recipe with its ingredients
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipeResult = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    const ingredientsResult = await pool.query(
      `SELECT ri.quantity, ri.unit, i.name, i.category, i.calories, i.protein, i.carbs, i.fat, i.fibre, i.price_per_unit
       FROM recipe_ingredients ri
       JOIN ingredients i ON ri.ingredient_id = i.id
       WHERE ri.recipe_id = $1
       ORDER BY i.category, i.name`,
      [id]
    );

    const recipe = recipeResult.rows[0];
    recipe.ingredients = ingredientsResult.rows;

    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
    ingredientsResult.rows.forEach((ing) => {
      const factor = ing.unit === "g" || ing.unit === "ml" ? ing.quantity / 100 : 1;
      totalCalories += (ing.calories || 0) * factor;
      totalProtein += (ing.protein || 0) * factor;
      totalCarbs += (ing.carbs || 0) * factor;
      totalFat += (ing.fat || 0) * factor;
    });

    recipe.nutrition = {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
      fat: Math.round(totalFat * 10) / 10,
    };

    // Check if the current user has saved this recipe
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      try {
        const jwt = require("jsonwebtoken");
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const savedCheck = await pool.query(
          "SELECT id FROM saved_recipes WHERE user_id = $1 AND recipe_id = $2",
          [decoded.id, id]
        );
        recipe.is_saved = savedCheck.rows.length > 0;
      } catch {
        recipe.is_saved = false;
      }
    } else {
      recipe.is_saved = false;
    }

    res.json(recipe);
  } catch (err) {
    console.error("Get recipe error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// POST /api/recipes
// Create a new recipe (logged-in users only)
// ==========================================
router.post("/", auth, async (req, res) => {
  try {
    const {
      title, description, instructions, cost_per_serving,
      prep_time, difficulty, cuisine, servings,
      is_vegetarian, is_vegan, is_gluten_free, image_url, ingredients
    } = req.body;

    const recipeResult = await pool.query(
      `INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free, image_url, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings || 2, is_vegetarian || false, is_vegan || false, is_gluten_free || false, image_url, req.user.id]
    );

    const recipe = recipeResult.rows[0];

    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        let ingredientResult = await pool.query(
          "SELECT id FROM ingredients WHERE LOWER(name) = $1",
          [ing.name.toLowerCase()]
        );

        let ingredient_id;
        if (ingredientResult.rows.length === 0) {
          const newIng = await pool.query(
            "INSERT INTO ingredients (name, category) VALUES ($1, $2) RETURNING id",
            [ing.name, ing.category || null]
          );
          ingredient_id = newIng.rows[0].id;
        } else {
          ingredient_id = ingredientResult.rows[0].id;
        }

        await pool.query(
          "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4)",
          [recipe.id, ingredient_id, ing.quantity, ing.unit]
        );
      }
    }

    res.status(201).json({ message: "Recipe created.", recipe });
  } catch (err) {
    console.error("Create recipe error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});

// ==========================================
// POST /api/recipes/:id/save
// Save/unsave a recipe (toggle favourite)
// ==========================================
router.post("/:id/save", auth, async (req, res) => {
  try {
    const recipe_id = req.params.id;
    const user_id = req.user.id;

    const existing = await pool.query(
      "SELECT id FROM saved_recipes WHERE user_id = $1 AND recipe_id = $2",
      [user_id, recipe_id]
    );

    if (existing.rows.length > 0) {
      await pool.query("DELETE FROM saved_recipes WHERE user_id = $1 AND recipe_id = $2", [user_id, recipe_id]);
      res.json({ message: "Recipe removed from saved.", saved: false });
    } else {
      await pool.query("INSERT INTO saved_recipes (user_id, recipe_id) VALUES ($1, $2)", [user_id, recipe_id]);
      res.json({ message: "Recipe saved.", saved: true });
    }
  } catch (err) {
    console.error("Save recipe error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});


// ==========================================
// DELETE /api/recipes/:id
// Delete a recipe (only the user who created it)
// ==========================================
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if recipe exists and belongs to this user
    const recipe = await pool.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );

    if (recipe.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    if (recipe.rows[0].created_by !== req.user.id) {
      return res.status(403).json({ error: "You can only delete recipes you created." });
    }

    // Delete related data first (foreign keys)
    await pool.query("DELETE FROM saved_recipes WHERE recipe_id = $1", [id]);
    await pool.query("DELETE FROM recipe_ingredients WHERE recipe_id = $1", [id]);
    await pool.query("DELETE FROM recipes WHERE id = $1", [id]);

    res.json({ message: "Recipe deleted." });
  } catch (err) {
    console.error("Delete recipe error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});



module.exports = router;
