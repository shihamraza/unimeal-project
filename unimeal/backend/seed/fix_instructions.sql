-- Fix recipe instructions that were stored as a single line.
-- Run this against the database to update existing data.

UPDATE recipes SET instructions =
'1. Whisk eggs with a splash of milk.
2. Melt butter in a pan.
3. Pour in eggs, stir gently until just set.
4. Serve on toasted bread.'
WHERE title = 'Scrambled Eggs on Toast';

UPDATE recipes SET instructions =
'1. Cook pasta according to packet instructions.
2. Mix drained pasta with tinned tomatoes and minced garlic.
3. Transfer to a baking dish and top with grated cheese.
4. Bake for 15 minutes at 200C until the cheese is golden and bubbling.'
WHERE title = 'Cheesy Pasta Bake';

UPDATE recipes SET instructions =
'1. Warm the tortilla in a dry pan for 30 seconds each side.
2. Fill with tinned beans, chopped bell pepper, and grated cheese.
3. Roll up tightly and eat.'
WHERE title = 'Veggie Wrap';

UPDATE recipes SET instructions =
'1. Slice chicken breast, bell pepper, and onion into strips.
2. Fry in oil with cumin over high heat for 8-10 minutes until cooked through.
3. Warm the tortillas in a pan or microwave.
4. Fill the tortillas with the chicken mixture and fold.'
WHERE title = 'Chicken Fajita Wrap';

UPDATE recipes SET instructions =
'1. Dice onion and garlic, fry in olive oil for 5 minutes until soft.
2. Add tinned tomatoes and 300ml water.
3. Simmer for 15 minutes.
4. Blend until smooth with a stick blender.
5. Season with salt and pepper and serve.'
WHERE title = 'Tomato Soup';

UPDATE recipes SET instructions =
'1. Whisk eggs with a splash of milk until combined.
2. Melt butter in a non-stick pan over low heat.
3. Add eggs and stir gently and continuously until just set.
4. Remove from heat and stir in grated cheese until melted.'
WHERE title = 'Cheesy Scrambled Eggs';

UPDATE recipes SET instructions =
'1. Peel and chop potatoes into chunks.
2. Boil in salted water for 15 minutes until tender.
3. Drain well, then return to the pot.
4. Mash with butter and a splash of milk until smooth.
5. Season with salt and pepper.'
WHERE title = 'Buttery Mash';

UPDATE recipes SET instructions =
'1. Dice chicken breast and fry in oil over high heat for 5-6 minutes until golden.
2. Push chicken to the side of the pan and scramble the egg in the gap.
3. Add cooked rice, frozen peas, and soy sauce.
4. Stir fry everything together for 3 minutes until heated through.'
WHERE title = 'Chicken Fried Rice';

UPDATE recipes SET instructions =
'1. Cook pasta according to packet instructions, then drain.
2. In the same pan, fry minced garlic in olive oil for 1 minute.
3. Add mixed vegetables and stir fry for 4 minutes.
4. Toss the drained pasta with the veg and season.'
WHERE title = 'Veggie Pasta Primavera';

UPDATE recipes SET instructions =
'1. Heat tinned beans in a pan with cumin and chilli flakes for 3-4 minutes.
2. Fry sliced onion in a little oil until soft.
3. Warm the tortilla in a dry pan.
4. Fill the tortilla with the bean mixture and onion, then fold.'
WHERE title = 'Chilli Bean Wrap';

UPDATE recipes SET instructions =
'1. Fry chopped bell pepper and onion in butter for 3-4 minutes.
2. Whisk eggs and pour over the veg in the pan.
3. Cook until the edges are set, then add grated cheese on one half.
4. Fold the omelette in half and slide onto a plate.'
WHERE title = 'Veggie Omelette';

UPDATE recipes SET instructions =
'1. Let butter soften at room temperature, then mix in minced garlic.
2. Slice bread and spread the garlic butter generously on each slice.
3. Place on a baking tray and bake for 8 minutes at 200C until golden.'
WHERE title = 'Garlic Bread';

UPDATE recipes SET instructions =
'1. Cook rice according to packet instructions.
2. In the last 2 minutes, stir in frozen peas.
3. Drain, then toss with olive oil and fresh lemon juice.
4. Season with salt and pepper.'
WHERE title = 'Lemon Pea Rice';

UPDATE recipes SET instructions =
'1. Dice potatoes and fry in oil over medium-high heat for 10 minutes, turning occasionally.
2. Add sliced onion and cook for a further 5 minutes until everything is golden and crispy.
3. Season well, then push to the side and fry an egg in the same pan.
4. Serve the hash topped with the fried egg.'
WHERE title = 'Potato and Onion Hash';

UPDATE recipes SET instructions =
'1. Cook rice according to packet instructions.
2. Heat tinned beans in a pan with cumin and chilli flakes.
3. Add chopped bell pepper and cook for 3-4 minutes until softened.
4. Spoon the spicy beans over the rice and serve.'
WHERE title = 'Spicy Bean Rice Bowl';
