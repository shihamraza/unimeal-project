import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <div className="notfound-emoji">🍽️</div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-message">
          Looks like this recipe got burned. The page you're looking for
          doesn't exist or has been moved.
        </p>
        <div className="notfound-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          <Link to="/recipes">
            <button className="btn btn-primary">Browse Recipes</button>
          </Link>
        </div>
        <p className="notfound-tip">
          Try browsing our <Link to="/recipes">25+ budget recipes</Link> instead.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
