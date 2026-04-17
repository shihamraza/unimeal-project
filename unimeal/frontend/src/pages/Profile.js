import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const getCuisineClass = (c) => {
  const key = (c || "").toLowerCase();
  const valid = ["italian", "chinese", "british", "mexican", "indian", "french"];
  return valid.includes(key) ? `cuisine-${key}` : "cuisine-default";
};

const getEmoji = (c) => {
  const map = { Italian: "🍝", Chinese: "🥡", British: "🇬🇧", Mexican: "🌮", Indian: "🍛", French: "🥐" };
  return map[c] || "🍽️";
};

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
        headers: { Authorization: `Bearer ${token}` },
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
              {user.is_vegetarian && <span className="tag tag-green">🌿 Vegetarian</span>}
              {user.is_vegan && <span className="tag tag-vegan">🌱 Vegan</span>}
              {user.is_gluten_free && <span className="tag tag-orange">🌾 Gluten Free</span>}
              {!user.is_vegetarian && !user.is_vegan && !user.is_gluten_free && (
                <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>No dietary preferences set</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-section">
          <h3>Saved Recipes ({savedRecipes.length})</h3>

          {loading ? (
            <div className="skeleton-grid" style={{ marginTop: "1rem" }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-body">
                    <div className="skeleton-line medium"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : savedRecipes.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-light)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔖</div>
              <p>No saved recipes yet.</p>
              <Link to="/recipes" className="btn btn-primary" style={{ marginTop: "0.75rem", display: "inline-block" }}>
                Browse Recipes
              </Link>
            </div>
          ) : (
            <div className="recipes-grid" style={{ marginTop: "1rem" }}>
              {savedRecipes.map((recipe) => (
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
                    <div className="recipe-card-meta">
                      <span>⏱ {recipe.prep_time} min</span>
                      <span className={`difficulty-${recipe.difficulty}`}>
                        {recipe.difficulty === "easy" ? "🟢" : recipe.difficulty === "medium" ? "🟡" : "🔴"} {recipe.difficulty}
                      </span>
                    </div>
                    <div className="recipe-card-tags">
                      {recipe.cuisine && <span className="tag tag-blue">{recipe.cuisine}</span>}
                      {recipe.is_vegetarian && <span className="tag tag-green">Vegetarian</span>}
                      {recipe.is_vegan && <span className="tag tag-vegan">Vegan</span>}
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
