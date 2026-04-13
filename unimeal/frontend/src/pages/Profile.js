import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchSavedRecipes();
  }, [user]);

  const fetchSavedRecipes = async () => {
    try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/saved/list`, {
  headers: { Authorization: `Bearer ${token}` }
});
      setSavedRecipes(res.data);
    } catch (err) {
      console.error("Failed to fetch saved recipes:", err);
    }
    setLoading(false);
  };

  if (!user) return null;

  const initial = user.display_name ? user.display_name.charAt(0).toUpperCase() : "?";

  return (
    <div className="page profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>
          <div className="profile-info">
            <h2>{user.display_name}</h2>
            <p>{user.email}</p>
            <div className="profile-prefs">
              {user.is_vegetarian && <span className="tag tag-green">Vegetarian</span>}
              {user.is_vegan && <span className="tag tag-green">Vegan</span>}
              {user.is_gluten_free && <span className="tag tag-orange">Gluten Free</span>}
              {!user.is_vegetarian && !user.is_vegan && !user.is_gluten_free && (
                <span style={{ color: "#999", fontSize: "0.85rem" }}>No dietary preferences set</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-section">
          <h3>Saved Recipes ({savedRecipes.length})</h3>

          {loading ? (
            <p style={{ color: "#999" }}>Loading...</p>
          ) : savedRecipes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#aaa" }}>
              <p>No saved recipes yet.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: "0.75rem", display: "inline-block" }}>
                Browse Recipes
              </Link>
            </div>
          ) : (
            <div className="recipes-grid">
              {savedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  <div className={`recipe-card-image cuisine-${(recipe.cuisine || "default").toLowerCase()}`}
                       style={{ height: "100px" }}>
                    {recipe.image_url ? (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
                      />
                    ) : (
                      <span style={{ fontSize: "2rem" }}>♥</span>
                    )}
                  </div>
                  <div className="recipe-card-body">
                    <div className="recipe-card-title">{recipe.title}</div>
                    <div className="recipe-card-meta">
                      <span>⏱ {recipe.prep_time} min</span>
                      <span>💰 £{parseFloat(recipe.cost_per_serving).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
