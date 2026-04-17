import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist. Maybe it was a recipe that got away.</p>
      <Link to="/recipes" className="btn btn-primary">Back to Recipes</Link>
    </div>
  );
}

export default NotFound;
