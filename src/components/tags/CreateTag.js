import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateTag = () => {
  const [label, setLabel] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTag = {
      label: label
    };

    fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTag)
    })
      .then(res => res.json())
      .then(() => {
        navigate("/tags");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Tag</h2>

      <input
        type="text"
        placeholder="Enter tag label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />

      <button type="submit">Save Tag</button>
    </form>
  );
};