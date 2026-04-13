import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

function AddRecipe() {
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    instructions: "",
    cost_per_serving: "",
    prep_time: "",
    difficulty: "easy",
    cuisine: "",
    servings: "2",
    is_vegetarian: false,
    is_vegan: false,
    is_gluten_free: false,
  });

  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "g" }
  ]);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addIngredientRow = () => {
    setIngredients((prev) => [...prev, { name: "", quantity: "", unit: "g" }]);
  };

  const removeIngredientRow = (index) => {
    if (ingredients.length === 1) return;
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.instructions || !form.cost_per_serving || !form.prep_time) {
      setError("Please fill in title, instructions, cost, and prep time.");
      return;
    }

    const validIngredients = ingredients.filter((ing) => ing.name && ing.quantity);
    if (validIngredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        cost_per_serving: parseFloat(form.cost_per_serving),
        prep_time: parseInt(form.prep_time),
        servings: parseInt(form.servings) || 2,
        ingredients: validIngredients.map((ing) => ({
          name: ing.name,
          quantity: parseFloat(ing.quantity),
          unit: ing.unit,
        })),
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes`, payload, {
  headers: { Authorization: `Bearer ${token}` }
});
      addToast("Recipe created!", "success");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create recipe.");
    }
    setSubmitting(false);
  };

  return (
    <div className="page">
      <h1 className="page-title">Add a Recipe</h1>
      <p className="page-subtitle">Share a budget-friendly meal with other students</p>

      <form className="add-recipe-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>Recipe Title *</label>
          <input type="text" name="title" placeholder="e.g. One-Pot Lemon Pasta" value={form.title} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <input type="text" name="description" placeholder="One or two sentences about the dish" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cost per Serving (£) *</label>
            <input type="number" name="cost_per_serving" step="0.01" placeholder="1.50" value={form.cost_per_serving} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Prep Time (minutes) *</label>
            <input type="number" name="prep_time" placeholder="20" value={form.prep_time} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Difficulty</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label>Cuisine</label>
            <select name="cuisine" value={form.cuisine} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="British">British</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Servings</label>
          <input type="number" name="servings" value={form.servings} onChange={handleChange} style={{ maxWidth: "100px" }} />
        </div>

        <div className="form-group">
          <label style={{ marginBottom: "8px" }}>Dietary Info</label>
          <div className="form-checkbox">
            <input type="checkbox" name="is_vegetarian" checked={form.is_vegetarian} onChange={handleChange} />
            <span>Vegetarian</span>
          </div>
          <div className="form-checkbox">
            <input type="checkbox" name="is_vegan" checked={form.is_vegan} onChange={handleChange} />
            <span>Vegan</span>
          </div>
          <div className="form-checkbox">
            <input type="checkbox" name="is_gluten_free" checked={form.is_gluten_free} onChange={handleChange} />
            <span>Gluten Free</span>
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients *</label>
          {ingredients.map((ing, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ing.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Qty"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
              />
              <select
                value={ing.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="each">each</option>
                <option value="tbsp">tbsp</option>
                <option value="tsp">tsp</option>
                <option value="cup">cup</option>
              </select>
              <button type="button" className="btn btn-danger btn-small" onClick={() => removeIngredientRow(index)}>✕</button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-small" onClick={addIngredientRow} style={{ marginTop: "0.5rem" }}>
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions *</label>
          <textarea
            name="instructions"
            rows="8"
            placeholder={"1. Boil the pasta according to packet instructions.\n2. Heat olive oil in a pan...\n3. Add garlic and cook for 1 minute..."}
            value={form.instructions}
            onChange={handleChange}
          />
          <span style={{ fontSize: "0.8rem", color: "#999" }}>Write each step on a new line, starting with the step number.</span>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting} style={{ padding: "12px 24px", fontSize: "1rem" }}>
          {submitting ? "Creating..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
