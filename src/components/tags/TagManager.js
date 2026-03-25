import { useEffect, useState } from "react";

export const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // GET all tags
  const getTags = () => {
    fetch("http://localhost:8088/tags")
      .then((res) => {
        if (!res.ok) throw new Error(`GET /tags failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const sortedTags = data.sort((a, b) => a.label.localeCompare(b.label));
        setTags(sortedTags);
      })
      .catch((err) => console.error(err));
  };

  // Load tags on page load
  useEffect(() => {
    getTags();
  }, []);

  // Handle new tag submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTag.trim()) {
      window.alert("Tag name is required");
      return;
    }

    fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: newTag }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`POST /tags failed: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setNewTag("");
        getTags();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        {/* LEFT SIDE — TAG LIST */}
        <div className="column is-half">
          <h2 className="title is-4">Tag Management</h2>

          {tags.length === 0 ? (
            <p>No tags yet.</p>
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="box is-flex is-justify-content-space-between is-align-items-center"
              >
                <span>{tag.label}</span>

                <div>
                  <button className="button is-small is-warning mr-2">
                    Edit
                  </button>
                  <button className="button is-small is-danger">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE — CREATE TAG */}
        <div className="column is-half">
          <h2 className="title is-4">Create Tag</h2>

          <div className="box">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Tag Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter tag name"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="button is-primary">
                Save Tag
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
