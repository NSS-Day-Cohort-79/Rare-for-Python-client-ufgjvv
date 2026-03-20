import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
export default function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
 
    setSubmitting(true);
    setError("");
 
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
 
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Failed to create category.");
        return;
      }
 
      navigate("/categories");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div>
      <h1>Create Category</h1>
 
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category-name">Category Name</label>
          <input
            id="category-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            disabled={submitting}
            autoFocus
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
 
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create Category"}
          </button>
          <button type="button" onClick={() => navigate("/categories")} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}