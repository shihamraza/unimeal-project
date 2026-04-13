import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
}

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [dietary, setDietary] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, [cuisine, difficulty, maxCost, dietary]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (cuisine) params.cuisine = cuisine;
      if (difficulty) params.difficulty = difficulty;
      if (maxCost) params.max_cost = maxCost;
      if (dietary === "vegetarian") params.is_vegetarian = "true";
      if (dietary === "vegan") params.is_vegan = "true";
      if (dietary === "gluten-free") params.is_gluten_free = "true";
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes`, { params });
      setRecipes(res.data);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const clearFilters = () => {
    setSearch(""); setCuisine(""); setDifficulty(""); setMaxCost(""); setDietary("");
  };

  const hasFilters = cuisine || difficulty || maxCost || dietary || search;

  const getEmoji = (c) => {
    const map = { Italian: "🍝", Chinese: "🥡", British: "🇬🇧", Mexican: "🌮", Indian: "🍛" };
    return map[c] || "🍽️";
  };

  const getCuisineClass = (c) => {
    const key = (c || "").toLowerCase();
    const valid = ["italian", "chinese", "british", "mexican", "indian"];
    return valid.includes(key) ? `cuisine-${key}` : "cuisine-default";
  };

  // Cost colour: green = bargain, amber = moderate
  const getCostClass = (cost) => {
    const c = parseFloat(cost);
    if (c <= 0.90) return "cost-bargain";
    if (c <= 1.30) return "cost-moderate";
    return "cost-normal";
  };

  // Stats for hero
  const stats = recipes.length > 0 ? {
    total: recipes.length,
    cheapest: Math.min(...recipes.map(r => parseFloat(r.cost_per_serving))).toFixed(2),
    avgTime: Math.round(recipes.reduce((a, r) => a + (r.prep_time || 0), 0) / recipes.length),
    veganCount: recipes.filter(r => r.is_vegan).length,
  } : { total: 0, cheapest: "0.00", avgTime: 0, veganCount: 0 };

  return (
    <div className="page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-bg-emoji hero-bg-1">🍽️</div>
        <div className="hero-bg-emoji hero-bg-2">🥗</div>
        <div className="hero-content">
          <h1 className="hero-title">Budget-friendly recipes 🍳</h1>
          <p className="hero-subtitle">Delicious meals under £3 per serving. Built for students, by students.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-label">📖 Recipes</div>
              <div className="hero-stat-value" style={{ color: "#38b583" }}>{stats.total}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">💰 Cheapest</div>
              <div className="hero-stat-value" style={{ color: "#f7971e" }}>£{stats.cheapest}</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">⏱ Avg Time</div>
              <div className="hero-stat-value" style={{ color: "#667eea" }}>{stats.avgTime}m</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-label">🌱 Vegan</div>
              <div className="hero-stat-value" style={{ color: "#11998e" }}>{stats.veganCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <form onSubmit={handleSearch} className="filters-bar">
        <input
          type="text" placeholder="Search recipes..."
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          <option value="Italian">🍝 Italian</option>
          <option value="Chinese">🥡 Chinese</option>
          <option value="British">🇬🇧 British</option>
          <option value="Mexican">🌮 Mexican</option>
          <option value="Indian">🍛 Indian</option>
        </select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">All Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <select value={maxCost} onChange={(e) => setMaxCost(e.target.value)}>
          <option value="">Any Price</option>
          <option value="1">Under £1</option>
          <option value="1.5">Under £1.50</option>
          <option value="2">Under £2</option>
          <option value="3">Under £3</option>
        </select>
        <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
          <option value="">Any Diet</option>
          <option value="vegetarian">🌿 Vegetarian</option>
          <option value="vegan">🌱 Vegan</option>
          <option value="gluten-free">🌾 Gluten Free</option>
        </select>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Results Count */}
      <div className="results-count">
        {loading ? "" : `${recipes.length} recipe${recipes.length !== 1 ? "s" : ""} found`}
        {hasFilters && !loading && (
          <button className="clear-filters" onClick={clearFilters}>Clear filters ✕</button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="skeleton-grid">
          {[1,2,3,4,5,6].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : recipes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p>No recipes found matching your filters.</p>
          <p style={{ fontSize: "0.85rem" }}>Try broadening your search or clearing some filters.</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
              <div className={`recipe-card-image ${getCuisineClass(recipe.cuisine)}`}>
                 {recipe.image_url ? (
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
                  />
                ) : (
                  getEmoji(recipe.cuisine)
                )}
                <div className={`cost-badge ${getCostClass(recipe.cost_per_serving)}`}>
                  £{parseFloat(recipe.cost_per_serving).toFixed(2)}
                </div>
                {recipe.prep_time && recipe.prep_time <= 15 && (
                  <div className="quick-badge">⚡ Quick</div>
                )}
              </div>
              <div className="recipe-card-body">
                <div className="recipe-card-title">{recipe.title}</div>
                <div className="recipe-card-desc">{recipe.description}</div>
                <div className="recipe-card-meta">
                  <span>⏱ {recipe.prep_time} min</span>
                  <span className={`difficulty-${recipe.difficulty}`}>
                    {recipe.difficulty === "easy" ? "🟢" : recipe.difficulty === "medium" ? "🟡" : "🔴"} {recipe.difficulty}
                  </span>
                  {recipe.servings && <span>🍽 {recipe.servings}</span>}
                </div>
                <div className="recipe-card-tags">
                  {recipe.cuisine && <span className="tag tag-blue">{recipe.cuisine}</span>}
                  {recipe.is_vegetarian && <span className="tag tag-green">Vegetarian</span>}
                  {recipe.is_vegan && <span className="tag tag-vegan">Vegan</span>}
                  {recipe.is_gluten_free && <span className="tag tag-orange">GF</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
