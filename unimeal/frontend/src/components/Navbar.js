// navbar component - handles navigation and user authentication state

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? "active" : "";
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        🍽️ <span>Uni</span>Meal
      </Link>

      {/* Desktop links */}
      <div className="navbar-links">
        <Link to="/recipes" className={isActive("/recipes")}>Recipes</Link>
        {user && <Link to="/meal-planner" className={isActive("/meal-planner")}>Planner</Link>}
        {user && <Link to="/shopping-list" className={isActive("/shopping-list")}>Shopping</Link>}
        {user && <Link to="/add-recipe" className={isActive("/add-recipe")}>+ Add</Link>}
      </div>

      {/* Desktop auth */}
      <div className="navbar-user">
        {user ? (
          <>
            <Link to="/profile" className="navbar-profile-link" onClick={closeMenu}>
              {user.display_name}
            </Link>
            <button className="btn btn-secondary btn-small" onClick={() => { logout(); closeMenu(); }}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              <button className="btn btn-secondary btn-small">Log In</button>
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <button className="btn btn-primary btn-small">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {/* Hamburger — mobile only */}
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/recipes" className={isActive("/recipes")} onClick={closeMenu}>🍳 Recipes</Link>
          {user && <Link to="/meal-planner" className={isActive("/meal-planner")} onClick={closeMenu}>📅 Planner</Link>}
          {user && <Link to="/shopping-list" className={isActive("/shopping-list")} onClick={closeMenu}>🛒 Shopping</Link>}
          {user && <Link to="/add-recipe" className={isActive("/add-recipe")} onClick={closeMenu}>➕ Add Recipe</Link>}
          <div className="mobile-menu-divider" />
          {user ? (
            <>
              <Link to="/profile" onClick={closeMenu}>👤 {user.display_name}</Link>
              <button className="btn btn-secondary" style={{ width: "100%", marginTop: "0.5rem" }} onClick={() => { logout(); closeMenu(); }}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} style={{ display: "block" }}><button className="btn btn-secondary" style={{ width: "100%" }}>Log In</button></Link>
              <Link to="/register" onClick={closeMenu} style={{ display: "block", marginTop: "0.5rem" }}><button className="btn btn-primary" style={{ width: "100%" }}>Sign Up</button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
