-- ============================================
-- UniMeal Seed Data
-- Run this AFTER schema.sql to populate with sample data
-- ============================================

-- ============================================
-- INGREDIENTS (with nutrition per 100g and prices)
-- ============================================
INSERT INTO ingredients (name, category, calories, protein, carbs, fat, fibre, price_per_unit, unit) VALUES
('pasta', 'pantry', 131, 5.0, 25.0, 1.1, 1.8, 0.80, 'g'),
('tinned chopped tomatoes', 'pantry', 17, 0.9, 3.0, 0.1, 0.7, 0.40, 'g'),
('garlic', 'produce', 149, 6.4, 33.1, 0.5, 2.1, 0.30, 'each'),
('onion', 'produce', 40, 1.1, 9.3, 0.1, 1.7, 0.15, 'each'),
('olive oil', 'pantry', 884, 0.0, 0.0, 100.0, 0.0, 3.00, 'ml'),
('chicken breast', 'meat', 165, 31.0, 0.0, 3.6, 0.0, 5.50, 'g'),
('rice', 'pantry', 130, 2.7, 28.2, 0.3, 0.4, 0.90, 'g'),
('mixed vegetables', 'frozen', 65, 3.3, 10.0, 0.5, 3.5, 1.00, 'g'),
('eggs', 'dairy', 155, 13.0, 1.1, 11.0, 0.0, 1.80, 'each'),
('bread', 'pantry', 265, 9.0, 49.0, 3.2, 2.7, 1.00, 'g'),
('cheese', 'dairy', 402, 25.0, 1.3, 33.0, 0.0, 2.50, 'g'),
('butter', 'dairy', 717, 0.9, 0.1, 81.0, 0.0, 1.60, 'g'),
('milk', 'dairy', 42, 3.4, 5.0, 1.0, 0.0, 1.15, 'ml'),
('bell pepper', 'produce', 31, 1.0, 6.0, 0.3, 2.1, 0.50, 'each'),
('potato', 'produce', 77, 2.0, 17.0, 0.1, 2.2, 0.20, 'g'),
('tinned beans', 'pantry', 127, 8.7, 21.0, 0.5, 6.4, 0.55, 'g'),
('tortilla wraps', 'pantry', 312, 8.8, 51.0, 8.0, 3.1, 1.20, 'each'),
('soy sauce', 'pantry', 53, 8.1, 4.9, 0.0, 0.8, 1.50, 'ml'),
('frozen peas', 'frozen', 81, 5.4, 14.5, 0.4, 5.1, 0.80, 'g'),
('tomato puree', 'pantry', 82, 4.3, 14.0, 0.5, 3.2, 0.65, 'g'),
('cheddar cheese', 'dairy', 402, 25.0, 1.3, 33.0, 0.0, 2.80, 'g'),
('cumin', 'pantry', 375, 17.8, 44.2, 22.3, 10.5, 1.20, 'g'),
('chilli flakes', 'pantry', 282, 12.0, 50.0, 5.8, 27.2, 1.00, 'g'),
('lemon', 'produce', 29, 1.1, 9.3, 0.3, 2.8, 0.30, 'each'),
('carrot', 'produce', 41, 0.9, 9.6, 0.2, 2.8, 0.10, 'each');

-- ============================================
-- RECIPES
-- ============================================

-- Recipe 1: Quick Tomato Pasta
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Quick Tomato Pasta',
  'A dead-simple pasta dish that costs almost nothing and takes 15 minutes.',
  '1. Boil pasta according to packet instructions.
2. While pasta cooks, heat olive oil in a pan over medium heat.
3. Add chopped garlic and cook for 1 minute.
4. Add tinned tomatoes, pinch of salt, pepper, and chilli flakes if you like.
5. Simmer for 8-10 minutes until thickened.
6. Drain pasta and toss with the sauce.
7. Serve with grated cheese on top.',
  1.20, 15, 'easy', 'Italian', 2, true, false, false
);

-- Recipe 2: Egg Fried Rice
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Egg Fried Rice',
  'A filling meal using leftover rice. Great for using up whatever veg you have.',
  '1. Cook rice and let it cool (or use leftover rice from the fridge - even better).
2. Heat oil in a wok or large frying pan over high heat.
3. Scramble the eggs in the pan, break them up, set aside.
4. Add more oil, then the frozen peas and any other veg.
5. Stir fry for 2-3 minutes.
6. Add the rice and soy sauce, stir fry for another 3-4 minutes.
7. Add the scrambled eggs back in and mix well.',
  1.50, 20, 'easy', 'Chinese', 2, true, false, true
);

-- Recipe 3: Chicken Stir Fry
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Chicken Stir Fry',
  'Quick and healthy. The soy sauce does most of the flavouring for you.',
  '1. Slice chicken breast into thin strips.
2. Heat oil in a wok over high heat.
3. Cook chicken for 5-6 minutes until golden.
4. Add sliced bell pepper and mixed vegetables.
5. Stir fry for 3-4 minutes.
6. Add soy sauce and stir.
7. Serve over cooked rice.',
  2.50, 25, 'easy', 'Chinese', 2, false, false, true
);

-- Recipe 4: Beans on Toast
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Beans on Toast',
  'The ultimate student meal. Cheap, filling, and surprisingly nutritious.',
  '1. Toast the bread.
2. Heat beans in a saucepan or microwave.
3. Pour beans over toast.
4. Add grated cheese on top if you want.
5. Season with pepper.',
  0.80, 5, 'easy', 'British', 1, true, false, false
);

-- Recipe 5: Simple Omelette
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Simple Omelette',
  'Quick protein-packed meal. Add whatever fillings you have.',
  '1. Crack 3 eggs into a bowl, add a splash of milk, whisk with a fork.
2. Heat butter in a frying pan over medium heat.
3. Pour in the egg mixture.
4. When the bottom sets, add cheese and any fillings to one half.
5. Fold the other half over and cook for another minute.
6. Slide onto a plate.',
  1.00, 10, 'easy', 'British', 1, true, false, true
);

-- Recipe 6: Veggie Burrito Bowl
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Veggie Burrito Bowl',
  'Filling, customisable, and most of the ingredients come from tins.',
  '1. Cook rice according to packet instructions.
2. Heat tinned beans in a pan with cumin and chilli flakes.
3. Chop bell pepper and onion.
4. Layer rice, beans, peppers, onion in a bowl.
5. Add cheese, squeeze of lemon, and any salsa or sauce you have.',
  1.80, 20, 'easy', 'Mexican', 2, true, false, true
);

-- Recipe 7: Garlic Butter Pasta
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Garlic Butter Pasta',
  'When you have basically nothing in the kitchen. Just pasta, butter, and garlic.',
  '1. Cook pasta according to packet instructions. Save a cup of pasta water before draining.
2. Melt butter in the same pot over medium heat.
3. Add minced garlic and cook for 1 minute (do not burn it).
4. Add the drained pasta back in with a splash of pasta water.
5. Toss everything together. Add pepper and parmesan if you have it.',
  0.90, 12, 'easy', 'Italian', 2, true, false, false
);

-- Recipe 8: Jacket Potato with Beans and Cheese
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Jacket Potato with Beans and Cheese',
  'Chuck a potato in the oven and forget about it for an hour. Easy.',
  '1. Preheat oven to 200C. Wash the potato and prick with a fork.
2. Rub with a little olive oil and salt.
3. Bake for 50-60 minutes until crispy outside and soft inside.
4. Heat beans in a pan or microwave.
5. Cut potato open, add butter, pile on beans and grated cheese.',
  1.30, 25, 'easy', 'British', 1, true, false, true
);

-- Recipe 9: Carrot and Lentil Soup
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Carrot and Lentil Soup',
  'Makes a big batch that lasts 3-4 days. Freezes well too.',
  '1. Chop onion and carrots.
2. Heat oil in a large pot, cook onion for 5 minutes until soft.
3. Add carrots, cumin, and chilli flakes. Cook for 2 minutes.
4. Add tinned tomatoes, lentils, and 500ml water.
5. Bring to a boil, then simmer for 20 minutes until carrots are soft.
6. Blend until smooth (or leave chunky if you prefer).
7. Season with salt, pepper, and lemon juice.',
  1.10, 30, 'easy', 'British', 4, true, true, true
);

-- Recipe 10: Chicken and Rice One-Pot
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free)
VALUES (
  'Chicken and Rice One-Pot',
  'Everything cooks in one pot. Less washing up, more eating.',
  '1. Dice chicken breast. Chop onion and bell pepper.
2. Heat oil in a large pot, brown the chicken for 5 minutes.
3. Add onion and pepper, cook for 3 minutes.
4. Add rice, tinned tomatoes, and 300ml water.
5. Stir, bring to boil, then cover and simmer on low for 15 minutes.
6. Do not lift the lid! Let the rice absorb the liquid.
7. Fluff with a fork and season.',
  2.20, 30, 'medium', 'British', 2, false, false, true
);

-- ============================================
-- RECIPE_INGREDIENTS (linking recipes to ingredients)
-- ============================================

-- Recipe 1: Quick Tomato Pasta
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, (SELECT id FROM ingredients WHERE name = 'pasta'), 200, 'g'),
(1, (SELECT id FROM ingredients WHERE name = 'tinned chopped tomatoes'), 400, 'g'),
(1, (SELECT id FROM ingredients WHERE name = 'garlic'), 2, 'each'),
(1, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml'),
(1, (SELECT id FROM ingredients WHERE name = 'cheese'), 30, 'g');

-- Recipe 2: Egg Fried Rice
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(2, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(2, (SELECT id FROM ingredients WHERE name = 'eggs'), 2, 'each'),
(2, (SELECT id FROM ingredients WHERE name = 'frozen peas'), 100, 'g'),
(2, (SELECT id FROM ingredients WHERE name = 'soy sauce'), 30, 'ml'),
(2, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml');

-- Recipe 3: Chicken Stir Fry
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(3, (SELECT id FROM ingredients WHERE name = 'chicken breast'), 300, 'g'),
(3, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(3, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each'),
(3, (SELECT id FROM ingredients WHERE name = 'mixed vegetables'), 150, 'g'),
(3, (SELECT id FROM ingredients WHERE name = 'soy sauce'), 30, 'ml'),
(3, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml');

-- Recipe 4: Beans on Toast
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(4, (SELECT id FROM ingredients WHERE name = 'tinned beans'), 200, 'g'),
(4, (SELECT id FROM ingredients WHERE name = 'bread'), 2, 'each'),
(4, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 30, 'g');

-- Recipe 5: Simple Omelette
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(5, (SELECT id FROM ingredients WHERE name = 'eggs'), 3, 'each'),
(5, (SELECT id FROM ingredients WHERE name = 'milk'), 30, 'ml'),
(5, (SELECT id FROM ingredients WHERE name = 'butter'), 10, 'g'),
(5, (SELECT id FROM ingredients WHERE name = 'cheese'), 30, 'g');

-- Recipe 6: Veggie Burrito Bowl
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(6, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(6, (SELECT id FROM ingredients WHERE name = 'tinned beans'), 200, 'g'),
(6, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each'),
(6, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(6, (SELECT id FROM ingredients WHERE name = 'cumin'), 5, 'g'),
(6, (SELECT id FROM ingredients WHERE name = 'lemon'), 1, 'each'),
(6, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 30, 'g');

-- Recipe 7: Garlic Butter Pasta
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(7, (SELECT id FROM ingredients WHERE name = 'pasta'), 200, 'g'),
(7, (SELECT id FROM ingredients WHERE name = 'butter'), 30, 'g'),
(7, (SELECT id FROM ingredients WHERE name = 'garlic'), 3, 'each');

-- Recipe 8: Jacket Potato with Beans and Cheese
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(8, (SELECT id FROM ingredients WHERE name = 'potato'), 300, 'g'),
(8, (SELECT id FROM ingredients WHERE name = 'tinned beans'), 200, 'g'),
(8, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 40, 'g'),
(8, (SELECT id FROM ingredients WHERE name = 'butter'), 10, 'g'),
(8, (SELECT id FROM ingredients WHERE name = 'olive oil'), 5, 'ml');

-- Recipe 9: Carrot and Lentil Soup
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(9, (SELECT id FROM ingredients WHERE name = 'carrot'), 3, 'each'),
(9, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(9, (SELECT id FROM ingredients WHERE name = 'tinned chopped tomatoes'), 400, 'g'),
(9, (SELECT id FROM ingredients WHERE name = 'cumin'), 5, 'g'),
(9, (SELECT id FROM ingredients WHERE name = 'chilli flakes'), 2, 'g'),
(9, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml'),
(9, (SELECT id FROM ingredients WHERE name = 'lemon'), 1, 'each');

-- Recipe 10: Chicken and Rice One-Pot
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(10, (SELECT id FROM ingredients WHERE name = 'chicken breast'), 300, 'g'),
(10, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(10, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(10, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each'),
(10, (SELECT id FROM ingredients WHERE name = 'tinned chopped tomatoes'), 400, 'g'),
(10, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml');
