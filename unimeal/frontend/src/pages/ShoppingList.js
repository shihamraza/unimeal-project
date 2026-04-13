import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const CATEGORY_META = {
  produce:  { icon: "🥬", label: "Fresh Produce" },
  protein:  { icon: "🥩", label: "Protein" },
  dairy:    { icon: "🧀", label: "Dairy" },
  carbs:    { icon: "🍞", label: "Carbs & Grains" },
  pantry:   { icon: "🫙", label: "Pantry Staples" },
  other:    { icon: "📦", label: "Other" },
};

function ShoppingList() {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [planId, setPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (token) findPlanAndFetchList();
    else setLoading(false);
  }, [token]);

  // Get the Monday of the current week as "YYYY-MM-DD"
  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    return monday.toISOString().split("T")[0];
  };

  // Step 1: Find this week's meal plan, then load shopping list
  const findPlanAndFetchList = async () => {
    const weekStart = getWeekStart();
    try {
      const planRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/meal-plans/${weekStart}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const id = planRes.data.id;
      setPlanId(id);
      await fetchShoppingList(id);
    } catch (err) {
      // No meal plan for this week
      setPlanId(null);
      setItems([]);
      setLoading(false);
    }
  };

  // Step 2: Fetch shopping list for a given meal plan ID
  const fetchShoppingList = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/shopping-lists/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data.items || []);
      setEstimatedTotal(res.data.estimated_total || 0);
    } catch (err) {
      // 404 = not generated yet
      setItems([]);
      setEstimatedTotal(0);
    }
    setLoading(false);
  };

  // Step 3: Generate shopping list from the meal plan
  const regenerate = async () => {
    if (!planId) {
      addToast("No meal plan found for this week. Add meals first!", "error");
      return;
    }
    setGenerating(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/shopping-lists/generate/${planId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToast("Shopping list generated! 🛒", "success");
      await fetchShoppingList(planId);
    } catch (err) {
      const msg = err.response?.data?.error || "Could not generate list";
      addToast(msg, "error");
    }
    setGenerating(false);
  };

  // Step 4: Toggle checked via backend PATCH
  const toggleCheck = async (itemId) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/shopping-lists/items/${itemId}/check`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, is_checked: !item.is_checked } : item
        )
      );
    } catch (err) {
      console.error("Could not toggle item:", err);
    }
  };

  // Group items by category
  const grouped = {};
  items.forEach(item => {
    const cat = (item.category || "other").toLowerCase();
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  const catOrder = ["produce", "protein", "dairy", "carbs", "pantry", "other"];
  const sortedCats = catOrder.filter(c => grouped[c]);

  const totalItems = items.length;
  const checkedCount = items.filter(i => i.is_checked).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  if (!token) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <p>Log in to view your shopping list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 700, margin: "0 auto" }}>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h1 className="page-title">Shopping List</h1>
          <p className="page-subtitle">
            {totalItems > 0
              ? `${totalItems} items · Est. £${parseFloat(estimatedTotal).toFixed(2)} total`
              : "Generate a list from your meal plan"}
          </p>
        </div>
        <button className="btn btn-primary" onClick={regenerate} disabled={generating}>
          {generating ? "Generating..." : "🔄 Generate from Planner"}
        </button>
      </div>

      {/* Progress bar */}
      {totalItems > 0 && (
        <div style={{ marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {checkedCount}/{totalItems} items checked
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--accent)" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="shopping-list">
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
              <div className="skeleton-line" style={{ width: 19, height: 19, borderRadius: 4 }}></div>
              <div className="skeleton-line medium" style={{ flex: 1 }}></div>
              <div className="skeleton-line short" style={{ width: 60 }}></div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          {!planId ? (
            <>
              <p>No meal plan found for this week.</p>
              <p style={{ fontSize: "0.85rem" }}>Go to the Planner tab and add some meals first.</p>
            </>
          ) : (
            <>
              <p>Your shopping list is empty.</p>
              <p style={{ fontSize: "0.85rem" }}>Hit the button above to generate it from your meal plan.</p>
              <button className="btn btn-primary" onClick={regenerate} style={{ marginTop: "1rem" }} disabled={generating}>
                {generating ? "Generating..." : "🛒 Generate Shopping List"}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="shopping-list">
          {sortedCats.map(cat => {
            const meta = CATEGORY_META[cat] || CATEGORY_META.other;
            return (
              <div key={cat} className={`shopping-category cat-${cat}`}>
                <h3>{meta.icon} {meta.label}</h3>
                {grouped[cat].map((item) => (
                  <div key={item.id} className={`shopping-item ${item.is_checked ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={item.is_checked || false}
                      onChange={() => toggleCheck(item.id)}
                    />
                    <span className="shopping-item-name">{item.name}</span>
                    <span className="shopping-item-qty">
                      {item.total_quantity} {item.unit}
                    </span>
                    {item.estimated_cost && (
                      <span className="shopping-item-cost">
                        £{parseFloat(item.estimated_cost).toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
