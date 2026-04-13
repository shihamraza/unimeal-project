import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, { headers });
      setRecipe(res.data);
      setSaved(res.data.is_saved || false);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

const toggleSave = async () => {
    if (!token) {
      addToast("Please log in to save recipes", "info");
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes/${id}/save`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaved(res.data.saved);
      addToast(res.data.saved ? "Recipe saved! ♥" : "Recipe removed from saved", res.data.saved ? "success" : "info");
    } catch (err) {
      addToast("Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="skeleton-card" style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="skeleton-image" style={{ height: 200 }}></div>
          <div className="skeleton-body">
            <div className="skeleton-line medium"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <p>Recipe not found.</p>
          <button className="btn btn-primary" onClick={() => navigate("/recipes")}>Back to Recipes</button>
        </div>
      </div>
    );
  }

  const instructions = recipe.instructions
    ? recipe.instructions.split("\n").filter(s => s.trim())
    : [];

  // Parse out step numbers if present
  const cleanStep = (step) => step.replace(/^\d+[\.\)]\s*/, "");

  const getDiffColour = (d) => {
    if (d === "easy") return "var(--diff-easy)";
    if (d === "medium") return "var(--diff-medium)";
    return "var(--diff-hard)";
  };

  const getDiffEmoji = (d) => {
    if (d === "easy") return "🟢";
    if (d === "medium") return "🟡";
    return "🔴";
  };

  return (
    <div className="page" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Link to="/recipes" className="back-link">← Back to recipes</Link>

      <div className="recipe-detail">
        <h1>{recipe.title}</h1>
        {recipe.description && <p className="recipe-detail-desc">{recipe.description}</p>}

        <div className="recipe-detail-meta">
          {recipe.cuisine && <span>🍽️ {recipe.cuisine}</span>}
          {recipe.prep_time && <span>⏱ {recipe.prep_time} min</span>}
          {recipe.difficulty && (
            <span>
              {getDiffEmoji(recipe.difficulty)}{" "}
              <span style={{ color: getDiffColour(recipe.difficulty), fontWeight: 600 }}>
                {recipe.difficulty}
              </span>
            </span>
          )}
          {recipe.servings && <span>👥 {recipe.servings} servings</span>}
          {recipe.cost_per_serving && (
            <span style={{ fontWeight: 700, color: parseFloat(recipe.cost_per_serving) <= 1 ? "var(--cost-bargain)" : "var(--text-muted)" }}>
              💰 £{parseFloat(recipe.cost_per_serving).toFixed(2)}/serving
            </span>
          )}
        </div>

        <div className="recipe-card-tags" style={{ marginBottom: "1.2rem" }}>
          {recipe.is_vegetarian && <span className="tag tag-green">🌿 Vegetarian</span>}
          {recipe.is_vegan && <span className="tag tag-vegan">🌱 Vegan</span>}
          {recipe.is_gluten_free && <span className="tag tag-orange">🌾 Gluten Free</span>}
        </div>

 <div className="recipe-actions">
          <button className={`btn ${saved ? "btn-danger" : "btn-primary"}`} onClick={toggleSave}>
            {saved ? "♥ Saved" : "♡ Save Recipe"}
          </button>
          {user && recipe.created_by === user.id && (
            <button className="btn btn-danger" onClick={async () => {
              if (!window.confirm("Delete this recipe? This cannot be undone.")) return;
              try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                addToast("Recipe deleted", "info");
                navigate("/recipes");
              } catch (err) {
                addToast(err.response?.data?.error || "Could not delete recipe", "error");
              }
            }}>
              🗑 Delete
            </button>
          )}
        </div>

        {/* Ingredients */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="recipe-section">
            <h2>🧾 Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  <span>{ing.name}</span>
                  <span style={{ color: "var(--text-light)", fontWeight: 500, fontSize: "0.88rem" }}>
                    {ing.quantity} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {instructions.length > 0 && (
          <div className="recipe-section">
            <h2>📋 Method</h2>
            <ol className="instructions-list">
              {instructions.map((step, i) => (
                <li key={i}>{cleanStep(step)}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Nutrition — colour-coded per macro */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div className="recipe-section">
            <h2>📊 Nutrition <span style={{ fontWeight: 400, fontSize: "0.82rem", color: "var(--text-light)" }}>(per serving, approx)</span></h2>
            <div className="nutrition-grid">
              <div className="nutrition-item nut-calories">
                <div className="value">
                  {Math.round(recipe.ingredients.reduce((sum, i) => sum + ((i.calories || 0) * (i.quantity || 0) / 100), 0) / (recipe.servings || 1))}
                </div>
                <div className="label">🔥 Calories</div>
              </div>
              <div className="nutrition-item nut-protein">
                <div className="value">
                  {Math.round(recipe.ingredients.reduce((sum, i) => sum + ((i.protein || 0) * (i.quantity || 0) / 100), 0) / (recipe.servings || 1))}g
                </div>
                <div className="label">💪 Protein</div>
              </div>
              <div className="nutrition-item nut-carbs">
                <div className="value">
                  {Math.round(recipe.ingredients.reduce((sum, i) => sum + ((i.carbs || 0) * (i.quantity || 0) / 100), 0) / (recipe.servings || 1))}g
                </div>
                <div className="label">⚡ Carbs</div>
              </div>
              <div className="nutrition-item nut-fat">
                <div className="value">
                  {Math.round(recipe.ingredients.reduce((sum, i) => sum + ((i.fat || 0) * (i.quantity || 0) / 100), 0) / (recipe.servings || 1))}g
                </div>
                <div className="label">🫧 Fat</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
