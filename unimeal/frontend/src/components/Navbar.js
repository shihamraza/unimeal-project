import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🍽️ <span>Uni</span>Meal
      </Link>

      <div className="navbar-links">
        <Link to="/" className={isActive("/")}>Recipes</Link>
        {user && <Link to="/meal-planner" className={isActive("/meal-planner")}>Planner</Link>}
        {user && <Link to="/shopping-list" className={isActive("/shopping-list")}>Shopping</Link>}
        {user && <Link to="/add-recipe" className={isActive("/add-recipe")}>+ Add</Link>}
      </div>

      <div className="navbar-user">
        {user ? (
          <>
            <Link to="/profile" style={{ color: "#8892a0", fontSize: "0.9rem", transition: "color 0.2s" }}>
              {user.display_name}
            </Link>
            <button className="btn btn-secondary btn-small" onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn btn-secondary btn-small">Log In</button></Link>
            <Link to="/register"><button className="btn btn-primary btn-small">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
