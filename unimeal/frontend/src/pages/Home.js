import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [featured, setFeatured] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes`);
      // Pick 4 varied recipes (different cuisines if possible)
      const all = res.data || [];
      const cuisines = [];
      const picks = [];
      for (const r of all) {
        if (!cuisines.includes(r.cuisine) && picks.length < 4) {
          picks.push(r);
          cuisines.push(r.cuisine);
        }
      }
      // Fill remaining slots if less than 4 cuisines
      if (picks.length < 4) {
        for (const r of all) {
          if (!picks.find(p => p.id === r.id) && picks.length < 4) {
            picks.push(r);
          }
        }
      }
      setFeatured(picks);
    } catch (err) {
      console.error(err);
    }
  };

  const getEmoji = (c) => {
    const map = { Italian: "🍝", Chinese: "🥡", British: "🇬🇧", Mexican: "🌮", Indian: "🍛" };
    return map[c] || "🍽️";
  };

  const getCuisineClass = (c) => {
    const key = (c || "").toLowerCase();
    const valid = ["italian", "chinese", "british", "mexican", "indian", "french"];
    return valid.includes(key) ? `cuisine-${key}` : "cuisine-default";
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-badge">For students, by students</span>
            <h1 className="hero-heading">
              Eat well on a <span className="hero-highlight">student budget</span>
            </h1>
            <p className="hero-desc">
              UniMeal helps you discover budget-friendly recipes, plan your meals for
              the week, and generate a shopping list automatically. Every recipe is
              under £3 per serving.
            </p>
            <div className="hero-buttons">
              <Link to="/recipes" className="btn btn-primary btn-lg">
                Browse Recipes
              </Link>
              {!token && (
                <Link to="/register" className="btn btn-outline btn-lg">
                  Create Account
                </Link>
              )}
            </div>
            <div className="hero-stats-row">
              <div className="hero-mini-stat">
                <span className="hero-mini-num">25+</span>
                <span className="hero-mini-label">Recipes</span>
              </div>
              <div className="hero-mini-stat">
                <span className="hero-mini-num">£3</span>
                <span className="hero-mini-label">Max per serving</span>
              </div>
              <div className="hero-mini-stat">
                <span className="hero-mini-num">5</span>
                <span className="hero-mini-label">Cuisines</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="hero-float-card hfc-1">🍝<span>Italian</span></div>
              <div className="hero-float-card hfc-2">🌮<span>Mexican</span></div>
              <div className="hero-float-card hfc-3">🍛<span>Indian</span></div>
              <div className="hero-float-card hfc-4">🥡<span>Chinese</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <h2 className="section-title">How it works</h2>
<div className="how-grid">
          <div
            className="how-card"
            onClick={() => navigate("/recipes")}
            style={{ cursor: "pointer" }}
          >
            <div className="how-icon" style={{ background: "var(--nut-cal-bg)", color: "var(--nut-cal)" }}>🔍</div>
            <h3>Find recipes</h3>
            <p>Browse 25+ budget meals. Filter by cuisine, dietary needs, price, or difficulty. Every recipe is under £3 per serving.</p>
          </div>
          <div
            className="how-card"
            onClick={() => navigate(token ? "/meal-planner" : "/login")}
            style={{ cursor: "pointer" }}
          >
            <div className="how-icon" style={{ background: "var(--nut-fat-bg)", color: "var(--nut-fat)" }}>📅</div>
            <h3>Plan your week</h3>
            <p>Drag recipes into breakfast, lunch, and dinner slots. See your weekly cost add up in real time. Stay on budget.</p>
          </div>
          <div
            className="how-card"
            onClick={() => navigate(token ? "/shopping-list" : "/login")}
            style={{ cursor: "pointer" }}
          >
            <div className="how-icon" style={{ background: "var(--tag-veg-bg)", color: "var(--tag-veg-text)" }}>🛒</div>
            <h3>Get your shopping list</h3>
            <p>One click generates a list of everything you need, grouped by category. Quantities are combined automatically.</p>
          </div>
        </div>
      </section>

      {/* Featured recipes */}
      {featured.length > 0 && (
        <section className="featured-section">
          <h2 className="section-title">Popular recipes</h2>
          <p className="section-subtitle">A few favourites to get you started</p>
          <div className="featured-grid">
            {featured.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              >
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
                  <div className="cost-badge">
                    £{parseFloat(recipe.cost_per_serving).toFixed(2)}
                  </div>
                </div>
                <div className="recipe-card-body">
                  <div className="recipe-card-title">{recipe.title}</div>
                  <div className="recipe-card-desc">{recipe.description}</div>
                  <div className="recipe-card-meta">
                    <span>⏱ {recipe.prep_time} min</span>
                    <span>{recipe.difficulty === "easy" ? "🟢" : "🟡"} {recipe.difficulty}</span>
                  </div>
                  <div className="recipe-card-tags">
                    <span className="tag tag-blue">{recipe.cuisine}</span>
                    {recipe.is_vegetarian && <span className="tag tag-green">Vegetarian</span>}
                    {recipe.is_vegan && <span className="tag tag-vegan">Vegan</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link to="/recipes" className="btn btn-primary">
              View all recipes →
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Ready to save money on food?</h2>
          <p>Join UniMeal and start planning meals that actually fit your budget.</p>
          <div className="hero-buttons">
            <Link to="/recipes" className="btn btn-primary btn-lg">
              Get started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
