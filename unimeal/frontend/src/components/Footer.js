import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-logo">🍽️ <strong>Uni</strong>Meal</span>
          <p className="footer-tagline">
            Budget-friendly recipes for students.<br />
            Every meal under £3 per serving.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links-group">
          <h4 className="footer-heading">Explore</h4>
          <Link to="/recipes">Browse Recipes</Link>
          <Link to="/meal-planner">Meal Planner</Link>
          <Link to="/shopping-list">Shopping List</Link>
          <Link to="/add-recipe">Add a Recipe</Link>
        </div>

        {/* Account */}
        <div className="footer-links-group">
          <h4 className="footer-heading">Account</h4>
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        {/* Team */}
        <div className="footer-links-group">
          <h4 className="footer-heading">Team — SE202L</h4>
          <span>Abdullah (2024033)</span>
          <span>Anousha Rahim (2024106)</span>
          <span>Shiham Raza (2024590)</span>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© {year} UniMeal · Built for SE202L – Development Operations Lab</span>
        <span className="footer-stack">React · Node.js · Docker · GitHub Actions · AWS EC2</span>
      </div>
    </footer>
  );
}

export default Footer;
