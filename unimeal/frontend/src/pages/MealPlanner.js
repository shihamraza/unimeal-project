import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS = { monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun" };
const MEALS = ["breakfast", "lunch", "dinner"];

function MealPlanner() {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [plan, setPlan] = useState(null);
  const [entries, setEntries] = useState({});
  const [recipes, setRecipes] = useState([]);
const [showModal, setShowModal] = useState(false);
  const [modalSlot, setModalSlot] = useState(null);
  const [modalSearch, setModalSearch] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);
  const [confirmRemove, setConfirmRemove] = useState(null);

  useEffect(() => {
    if (token) {
      fetchPlan();
      fetchRecipes();
    }
  }, [token, weekOffset]);

  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff + weekOffset * 7);
    return monday.toISOString().split("T")[0];
  };

  const getWeekLabel = () => {
    const weekStart = getWeekStart();
    const monday = new Date(weekStart + "T00:00:00");
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = (d) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    return `${fmt(monday)} — ${fmt(sunday)}`;
  };

  const fetchPlan = async () => {
    const weekStart = getWeekStart();
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/meal-plans/${weekStart}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlan(res.data);
      const lookup = {};
      if (res.data.entries) {
        res.data.entries.forEach(e => {
          lookup[`${e.day_of_week}-${e.meal_slot}`] = e;
        });
      }
      setEntries(lookup);
    } catch (err) {
      setPlan(null);
      setEntries({});
    }
  };

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes`);
      setRecipes(res.data);
    } catch (err) { console.error(err); }
  };

  const ensurePlan = async () => {
    if (plan && plan.id) return plan.id;
    const weekStart = getWeekStart();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/meal-plans`, {
        week_start: weekStart
      }, { headers: { Authorization: `Bearer ${token}` } });
      const newPlan = res.data.meal_plan;
      setPlan({ ...newPlan, entries: [] });
      return newPlan.id;
    } catch (err) {
      console.error("Could not create plan:", err);
      return null;
    }
  };

  const openModal = (day, meal) => {
    setModalSlot({ day, meal });
    setModalSearch("");
    setShowModal(true);
  };

  const selectRecipe = async (recipe) => {
    try {
      const planId = await ensurePlan();
      if (!planId) {
        addToast("Could not create meal plan", "error");
        return;
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/api/meal-plans/${planId}/entries`, {
        recipe_id: recipe.id,
        day_of_week: modalSlot.day,
        meal_slot: modalSlot.meal
      }, { headers: { Authorization: `Bearer ${token}` } });
      addToast(`Added ${recipe.title}`, "success");
      setShowModal(false);
      fetchPlan();
    } catch (err) {
      addToast("Could not add meal", "error");
    }
  };
const removeEntry = (day, meal) => {
    const key = `${day}-${meal}`;
    const entry = entries[key];
    if (!entry || !plan) return;
    setConfirmRemove({ entry, mealName: entry.title || "this meal" });
  };

  const confirmRemoveEntry = async () => {
    if (!confirmRemove) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/meal-plans/${plan.id}/entries/${confirmRemove.entry.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addToast("Meal removed", "info");
      fetchPlan();
    } catch (err) {
      addToast("Could not remove meal", "error");
    }
    setConfirmRemove(null);
  };

  const weekTotal = Object.values(entries).reduce((sum, e) => {
    return sum + (e.cost_per_serving ? parseFloat(e.cost_per_serving) : 0);
  }, 0);
  const mealCount = Object.keys(entries).length;

  const getMealCellClass = (meal) => {
    if (meal === "breakfast") return "breakfast-cell";
    if (meal === "lunch") return "lunch-cell";
    return "dinner-cell";
  };

  const getSlotLabelClass = (meal) => {
    if (meal === "breakfast") return "slot-breakfast";
    if (meal === "lunch") return "slot-lunch";
    return "slot-dinner";
  };

  const getMealEmoji = (meal) => {
    if (meal === "breakfast") return "🌅";
    if (meal === "lunch") return "☀️";
    return "🌙";
  };

  const getMealLabel = (meal) => meal.charAt(0).toUpperCase() + meal.slice(1);

  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(modalSearch.toLowerCase())
  );

  if (!token) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <p>Log in to use the meal planner.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Meal Planner</h1>
        <p className="page-subtitle">Plan your week, stay on budget</p>
      </div>

      <div className="week-nav">
        <button className="btn btn-secondary btn-small" onClick={() => setWeekOffset(weekOffset - 1)}>← Prev</button>
        <span>{getWeekLabel()}</span>
        <button className="btn btn-secondary btn-small" onClick={() => setWeekOffset(weekOffset + 1)}>Next →</button>
        {weekOffset !== 0 && (
          <button className="btn btn-outline btn-small" onClick={() => setWeekOffset(0)}>Today</button>
        )}
      </div>

      <div className="meal-planner-grid">
        <div className="meal-planner-header"></div>
        {DAYS.map(day => (
          <div key={day} className="meal-planner-header">{DAY_LABELS[day]}</div>
        ))}

        {MEALS.map(meal => (
          <React.Fragment key={meal}>
            <div className={`meal-slot-label ${getSlotLabelClass(meal)}`}>
              {getMealEmoji(meal)} {getMealLabel(meal)}
            </div>
            {DAYS.map(day => {
              const key = `${day}-${meal}`;
              const entry = entries[key];
              const cellClass = getMealCellClass(meal);
              return (
                <div
                  key={key}
                  className={`meal-slot-cell ${cellClass} ${entry ? "filled" : ""}`}
                  onClick={() => !entry && openModal(day, meal)}
                >
                  {entry ? (
                    <>
                      <div className="meal-slot-recipe">{entry.title}</div>
                      {entry.cost_per_serving && (
                        <div className="meal-slot-cost">£{parseFloat(entry.cost_per_serving).toFixed(2)}</div>
                      )}
                      <button className="meal-slot-remove" onClick={(e) => { e.stopPropagation(); removeEntry(day, meal); }}>✕</button>
                    </>
                  ) : (
                    <span className="meal-slot-empty">+</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="planner-summary">
        <div className="planner-total">
          Weekly total: <span>£{weekTotal.toFixed(2)}</span>
        </div>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          {mealCount}/21 meals planned
        </span>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{getMealEmoji(modalSlot.meal)} Add {getMealLabel(modalSlot.meal)} — {DAY_LABELS[modalSlot.day]}</h3>
            <input
              className="modal-search"
              placeholder="Search recipes..."
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              autoFocus
            />
            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
              {filteredRecipes.length === 0 ? (
                <p style={{ textAlign: "center", padding: "1rem", color: "var(--text-light)" }}>No recipes found</p>
              ) : (
                filteredRecipes.map(r => (
                  <div key={r.id} className="modal-recipe-item" onClick={() => selectRecipe(r)}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{r.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                        {r.cuisine} · {r.prep_time}min · {r.difficulty}
                      </div>
                    </div>
                    <span style={{
                      fontWeight: 700, fontSize: "0.85rem",
                      color: parseFloat(r.cost_per_serving) <= 1 ? "var(--cost-bargain)" : "var(--text-muted)",
                    }}>
                      £{parseFloat(r.cost_per_serving).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ width: "100%", marginTop: "0.75rem" }}>Cancel</button>
          </div>
        </div>
      )}

      {confirmRemove && (
        <div className="modal-overlay" onClick={() => setConfirmRemove(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "400px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Remove meal?</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Are you sure you want to remove <strong>{confirmRemove.mealName}</strong> from your plan?
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setConfirmRemove(null)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmRemoveEntry}
                style={{ background: "#dc2626", borderColor: "#dc2626" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
          

export default MealPlanner;
