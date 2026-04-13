-- ============================================
-- UniMeal Database Schema
-- COMP208 Group Software Project
-- ============================================

-- Drop tables if they exist (useful during development)
DROP TABLE IF EXISTS shopping_list_items CASCADE;
DROP TABLE IF EXISTS shopping_lists CASCADE;
DROP TABLE IF EXISTS meal_plan_entries CASCADE;
DROP TABLE IF EXISTS meal_plans CASCADE;
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS recipe_ingredients CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- 1. USERS
-- Stores account info and dietary preferences
-- ============================================
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,          -- bcrypt hashed, never plain text
    display_name    VARCHAR(100) NOT NULL,
    is_vegetarian   BOOLEAN DEFAULT FALSE,
    is_vegan        BOOLEAN DEFAULT FALSE,
    is_gluten_free  BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. RECIPES
-- Each recipe has cost, time, difficulty etc.
-- ============================================
CREATE TABLE recipes (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    instructions    TEXT NOT NULL,                   -- step-by-step cooking instructions
    cost_per_serving DECIMAL(5,2) NOT NULL,          -- in GBP, e.g. 2.50
    prep_time       INTEGER NOT NULL,                -- in minutes
    difficulty      VARCHAR(20) NOT NULL             -- 'easy', 'medium', 'hard'
                    CHECK (difficulty IN ('easy', 'medium', 'hard')),
    cuisine         VARCHAR(50),                     -- e.g. 'Italian', 'Indian', 'British'
    servings        INTEGER DEFAULT 2,
    is_vegetarian   BOOLEAN DEFAULT FALSE,
    is_vegan        BOOLEAN DEFAULT FALSE,
    is_gluten_free  BOOLEAN DEFAULT FALSE,
    image_url       VARCHAR(500),
    created_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,  -- NULL = seeded by team
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. INGREDIENTS
-- Master list of ingredients with nutrition data
-- Nutrition values are per 100g (from public dataset)
-- ============================================
CREATE TABLE ingredients (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) UNIQUE NOT NULL,    -- e.g. 'chicken breast', 'pasta'
    category        VARCHAR(50),                     -- 'produce', 'dairy', 'pantry', 'meat', 'frozen'
    calories        DECIMAL(7,2),                    -- per 100g
    protein         DECIMAL(7,2),                    -- grams per 100g
    carbs           DECIMAL(7,2),                    -- grams per 100g
    fat             DECIMAL(7,2),                    -- grams per 100g
    fibre           DECIMAL(7,2),                    -- grams per 100g
    price_per_unit  DECIMAL(5,2),                    -- average UK price in GBP
    unit            VARCHAR(20) DEFAULT 'g'          -- 'g', 'ml', 'each'
);

-- ============================================
-- 4. RECIPE_INGREDIENTS (many-to-many)
-- Links recipes to ingredients with quantities
-- This is the key relational table
-- ============================================
CREATE TABLE recipe_ingredients (
    id              SERIAL PRIMARY KEY,
    recipe_id       INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id   INTEGER NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity        DECIMAL(7,2) NOT NULL,           -- e.g. 200 (grams), 2 (each)
    unit            VARCHAR(20) NOT NULL,            -- 'g', 'ml', 'tbsp', 'tsp', 'each', 'cup'
    UNIQUE(recipe_id, ingredient_id)                 -- no duplicate ingredients per recipe
);

-- ============================================
-- 5. MEAL_PLANS
-- One per user per week
-- ============================================
CREATE TABLE meal_plans (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_start      DATE NOT NULL,                   -- Monday of the week
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, week_start)                      -- one plan per user per week
);

-- ============================================
-- 6. MEAL_PLAN_ENTRIES
-- Each entry = one recipe assigned to a day + meal slot
-- ============================================
CREATE TABLE meal_plan_entries (
    id              SERIAL PRIMARY KEY,
    meal_plan_id    INTEGER NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    recipe_id       INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    day_of_week     VARCHAR(10) NOT NULL             -- 'monday', 'tuesday', etc.
                    CHECK (day_of_week IN ('monday','tuesday','wednesday','thursday','friday','saturday','sunday')),
    meal_slot       VARCHAR(10) NOT NULL             -- 'breakfast', 'lunch', 'dinner'
                    CHECK (meal_slot IN ('breakfast', 'lunch', 'dinner')),
    UNIQUE(meal_plan_id, day_of_week, meal_slot)     -- only one recipe per day per slot
);

-- ============================================
-- 7. SHOPPING_LISTS
-- Generated from a meal plan
-- ============================================
CREATE TABLE shopping_lists (
    id              SERIAL PRIMARY KEY,
    meal_plan_id    INTEGER NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    estimated_total DECIMAL(6,2),                    -- total estimated cost
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(meal_plan_id)                             -- one shopping list per meal plan
);

-- ============================================
-- 8. SHOPPING_LIST_ITEMS
-- Individual items, aggregated from all recipes in the plan
-- ============================================
CREATE TABLE shopping_list_items (
    id              SERIAL PRIMARY KEY,
    shopping_list_id INTEGER NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
    ingredient_id   INTEGER NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    total_quantity  DECIMAL(7,2) NOT NULL,           -- combined from all recipes
    unit            VARCHAR(20) NOT NULL,
    estimated_cost  DECIMAL(5,2),
    is_checked      BOOLEAN DEFAULT FALSE            -- user can tick items off
);

-- ============================================
-- 9. SAVED_RECIPES
-- User favourites
-- ============================================
CREATE TABLE saved_recipes (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id       INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    saved_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, recipe_id)                       -- can't save the same recipe twice
);

-- ============================================
-- INDEXES for performance
-- These speed up the queries you'll use most often
-- ============================================
CREATE INDEX idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX idx_recipes_cost ON recipes(cost_per_serving);
CREATE INDEX idx_recipes_prep_time ON recipes(prep_time);
CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE INDEX idx_meal_plan_entries_plan ON meal_plan_entries(meal_plan_id);
CREATE INDEX idx_meal_plans_user ON meal_plans(user_id);
CREATE INDEX idx_saved_recipes_user ON saved_recipes(user_id);
CREATE INDEX idx_ingredients_category ON ingredients(category);
