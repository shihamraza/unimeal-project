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

-- ============================================
-- RECIPES 11–25 (extra)
-- ============================================
INSERT INTO recipes (title, description, instructions, cost_per_serving, prep_time, difficulty, cuisine, servings, is_vegetarian, is_vegan, is_gluten_free) VALUES
('Scrambled Eggs on Toast', 'Five-minute breakfast classic.', '1. Whisk eggs with a splash of milk.
2. Melt butter in a pan.
3. Pour in eggs, stir gently until just set.
4. Serve on toasted bread.', 0.90, 7, 'easy', 'British', 1, true, false, false),
('Cheesy Pasta Bake', 'Baked pasta with tomato sauce and cheese on top.', '1. Cook pasta until al dente.
2. Mix with tinned tomatoes and garlic.
3. Pour into an oven dish.
4. Top with grated cheese.
5. Bake 15 min at 200C until golden.', 1.60, 30, 'easy', 'Italian', 2, true, false, false),
('Veggie Wrap', 'A quick lunch wrap packed with beans and peppers.', '1. Warm tortilla in a dry pan.
2. Heat beans in a saucepan.
3. Chop bell pepper.
4. Fill tortilla with beans, pepper, and cheese.
5. Roll up tightly and serve.', 1.40, 10, 'easy', 'Mexican', 1, true, false, false),
('Chicken Fajita Wrap', 'Spiced chicken in a soft tortilla.', '1. Slice chicken breast into strips.
2. Slice bell pepper and onion.
3. Heat oil in a pan over high heat.
4. Fry chicken for 5 minutes until golden.
5. Add pepper, onion, and cumin. Cook 3 minutes.
6. Warm tortillas and fill with the mixture.', 2.40, 20, 'easy', 'Mexican', 2, false, false, false),
('Tomato Soup', 'A warming bowl on a cold day.', '1. Dice onion and crush garlic.
2. Heat olive oil and fry onion for 3 minutes.
3. Add garlic and cook for 30 seconds.
4. Pour in tinned tomatoes and 300ml water.
5. Simmer for 15 minutes.
6. Blend until smooth and season.', 0.85, 25, 'easy', 'British', 2, true, true, true),
('Cheesy Scrambled Eggs', 'Scrambled eggs with melted cheese stirred in.', '1. Whisk eggs with a splash of milk.
2. Melt butter in a pan over medium heat.
3. Pour in eggs and stir gently.
4. When almost set, stir in grated cheese.
5. Serve immediately.', 1.10, 8, 'easy', 'British', 1, true, false, true),
('Buttery Mash', 'Creamy mashed potato side dish.', '1. Peel potatoes and chop into chunks.
2. Boil in salted water for 15 minutes until tender.
3. Drain well.
4. Add butter and a splash of milk.
5. Mash until smooth and season.', 0.70, 20, 'easy', 'British', 2, true, false, true),
('Chicken Fried Rice', 'Fried rice with chicken, egg and peas.', '1. Cook rice and let it cool.
2. Dice chicken breast and fry in oil for 5 minutes.
3. Push chicken aside and scramble the egg.
4. Add rice and frozen peas to the pan.
5. Pour in soy sauce and stir fry for 3 minutes.
6. Mix everything together and serve.', 2.30, 25, 'medium', 'Chinese', 2, false, false, false),
('Veggie Pasta Primavera', 'Pasta with mixed veg and garlic oil.', '1. Cook pasta in salted boiling water.
2. Heat olive oil in a pan.
3. Add crushed garlic and cook for 30 seconds.
4. Add mixed vegetables and cook for 4 minutes.
5. Drain pasta and toss with the veg.
6. Season and serve.', 1.30, 18, 'easy', 'Italian', 2, true, true, false),
('Chilli Bean Wrap', 'Spicy beans wrapped in a tortilla.', '1. Heat tinned beans in a pan.
2. Add cumin and chilli flakes, stir well.
3. Dice and fry onion until soft.
4. Mix onion into the beans.
5. Warm a tortilla and fill with the mixture.
6. Roll up and serve.', 1.20, 12, 'easy', 'Mexican', 1, true, true, false),
('Veggie Omelette', 'Omelette with peppers, onion and cheese.', '1. Dice bell pepper and onion.
2. Fry in butter for 3 minutes.
3. Whisk 3 eggs and pour over the veg.
4. Cook until the base sets.
5. Sprinkle cheese on one half.
6. Fold over and serve.', 1.30, 12, 'easy', 'French', 1, true, false, true),
('Garlic Bread', 'Crunchy buttery garlic bread.', '1. Soften butter at room temperature.
2. Mix in crushed garlic.
3. Slice bread and spread the garlic butter.
4. Place on a baking tray.
5. Bake at 200C for 8 minutes until golden.', 0.60, 10, 'easy', 'Italian', 2, true, false, false),
('Lemon Pea Rice', 'Light rice with peas and a lemon lift.', '1. Cook rice according to packet instructions.
2. Boil frozen peas for 2 minutes and drain.
3. Stir peas into the rice.
4. Add a drizzle of olive oil and squeeze of lemon.
5. Season and serve.', 0.95, 20, 'easy', 'British', 2, true, true, true),
('Potato and Onion Hash', 'Crispy pan-fried potatoes with onion and egg.', '1. Peel and dice potatoes into small cubes.
2. Heat oil in a frying pan.
3. Fry potatoes for 10 minutes until crispy.
4. Add sliced onion and cook for 5 minutes.
5. Season with salt and pepper.
6. Top with a fried egg and serve.', 1.40, 25, 'medium', 'British', 2, true, false, true),
('Spicy Bean Rice Bowl', 'Rice topped with spicy beans and peppers.', '1. Cook rice according to packet instructions.
2. Heat tinned beans in a pan.
3. Add cumin, chilli flakes, and diced bell pepper.
4. Cook for 5 minutes, stirring occasionally.
5. Spoon the spicy beans over the rice.
6. Season and serve.', 1.50, 20, 'easy', 'Mexican', 2, true, true, true);
-- ============================================
-- RECIPE_INGREDIENTS for recipes 11–25
-- ============================================

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
-- 11 Scrambled Eggs on Toast
(11, (SELECT id FROM ingredients WHERE name = 'eggs'), 2, 'each'),
(11, (SELECT id FROM ingredients WHERE name = 'bread'), 2, 'each'),
(11, (SELECT id FROM ingredients WHERE name = 'butter'), 10, 'g'),
(11, (SELECT id FROM ingredients WHERE name = 'milk'), 20, 'ml'),
-- 12 Cheesy Pasta Bake
(12, (SELECT id FROM ingredients WHERE name = 'pasta'), 200, 'g'),
(12, (SELECT id FROM ingredients WHERE name = 'tinned chopped tomatoes'), 400, 'g'),
(12, (SELECT id FROM ingredients WHERE name = 'garlic'), 2, 'each'),
(12, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 80, 'g'),
-- 13 Veggie Wrap
(13, (SELECT id FROM ingredients WHERE name = 'tortilla wraps'), 1, 'each'),
(13, (SELECT id FROM ingredients WHERE name = 'tinned beans'), 150, 'g'),
(13, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each'),
(13, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 30, 'g'),
-- 14 Chicken Fajita Wrap
(14, (SELECT id FROM ingredients WHERE name = 'chicken breast'), 250, 'g'),
(14, (SELECT id FROM ingredients WHERE name = 'tortilla wraps'), 2, 'each'),
(14, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each'),
(14, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(14, (SELECT id FROM ingredients WHERE name = 'cumin'), 5, 'g'),
(14, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml'),
-- 15 Tomato Soup
(15, (SELECT id FROM ingredients WHERE name = 'tinned chopped tomatoes'), 400, 'g'),
(15, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(15, (SELECT id FROM ingredients WHERE name = 'garlic'), 2, 'each'),
(15, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml'),
-- 16 Cheesy Scrambled Eggs
(16, (SELECT id FROM ingredients WHERE name = 'eggs'), 3, 'each'),
(16, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 30, 'g'),
(16, (SELECT id FROM ingredients WHERE name = 'butter'), 10, 'g'),
(16, (SELECT id FROM ingredients WHERE name = 'milk'), 20, 'ml'),
-- 17 Buttery Mash
(17, (SELECT id FROM ingredients WHERE name = 'potato'), 400, 'g'),
(17, (SELECT id FROM ingredients WHERE name = 'butter'), 30, 'g'),
(17, (SELECT id FROM ingredients WHERE name = 'milk'), 50, 'ml'),
-- 18 Chicken Fried Rice
(18, (SELECT id FROM ingredients WHERE name = 'chicken breast'), 200, 'g'),
(18, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(18, (SELECT id FROM ingredients WHERE name = 'eggs'), 1, 'each'),
(18, (SELECT id FROM ingredients WHERE name = 'frozen peas'), 100, 'g'),
(18, (SELECT id FROM ingredients WHERE name = 'soy sauce'), 30, 'ml'),
(18, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml'),
-- 19 Veggie Pasta Primavera
(19, (SELECT id FROM ingredients WHERE name = 'pasta'), 200, 'g'),
(19, (SELECT id FROM ingredients WHERE name = 'mixed vegetables'), 200, 'g'),
(19, (SELECT id FROM ingredients WHERE name = 'garlic'), 2, 'each'),
(19, (SELECT id FROM ingredients WHERE name = 'olive oil'), 20, 'ml'),
-- 20 Chilli Bean Wrap
(20, (SELECT id FROM ingredients WHERE name = 'tortilla wraps'), 1, 'each'),
(20, (SELECT id FROM ingredients WHERE name = 'tinned beans'), 200, 'g'),
(20, (SELECT id FROM ingredients WHERE name = 'cumin'), 3, 'g'),
(20, (SELECT id FROM ingredients WHERE name = 'chilli flakes'), 2, 'g'),
(20, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
-- 21 Veggie Omelette
(21, (SELECT id FROM ingredients WHERE name = 'eggs'), 3, 'each'),
(21, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each'),
(21, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(21, (SELECT id FROM ingredients WHERE name = 'cheddar cheese'), 30, 'g'),
(21, (SELECT id FROM ingredients WHERE name = 'butter'), 10, 'g'),
-- 22 Garlic Bread
(22, (SELECT id FROM ingredients WHERE name = 'bread'), 4, 'each'),
(22, (SELECT id FROM ingredients WHERE name = 'butter'), 40, 'g'),
(22, (SELECT id FROM ingredients WHERE name = 'garlic'), 3, 'each'),
-- 23 Lemon Pea Rice
(23, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(23, (SELECT id FROM ingredients WHERE name = 'frozen peas'), 100, 'g'),
(23, (SELECT id FROM ingredients WHERE name = 'lemon'), 1, 'each'),
(23, (SELECT id FROM ingredients WHERE name = 'olive oil'), 15, 'ml'),
-- 24 Potato and Onion Hash
(24, (SELECT id FROM ingredients WHERE name = 'potato'), 300, 'g'),
(24, (SELECT id FROM ingredients WHERE name = 'onion'), 1, 'each'),
(24, (SELECT id FROM ingredients WHERE name = 'olive oil'), 20, 'ml'),
(24, (SELECT id FROM ingredients WHERE name = 'eggs'), 2, 'each'),
-- 25 Spicy Bean Rice Bowl
(25, (SELECT id FROM ingredients WHERE name = 'rice'), 200, 'g'),
(25, (SELECT id FROM ingredients WHERE name = 'tinned beans'), 200, 'g'),
(25, (SELECT id FROM ingredients WHERE name = 'cumin'), 5, 'g'),
(25, (SELECT id FROM ingredients WHERE name = 'chilli flakes'), 2, 'g'),
(25, (SELECT id FROM ingredients WHERE name = 'bell pepper'), 1, 'each');


UPDATE recipes SET image_url = CONCAT('https://unimeal-alpha.vercel.app/images/', id, '.jpg');