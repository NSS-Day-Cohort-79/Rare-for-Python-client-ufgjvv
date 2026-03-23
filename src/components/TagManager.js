import { useEffect, useState } from "react";

export const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // 🔹 Fetch all tags
  const getTags = () => {
    fetch("http://localhost:8088/tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
  };

  useEffect(() => {
    getTags();
  }, []);

  // 🔹 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const tagObj = {
      label: newTag,
    };

    fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagObj),
    }).then(() => {
      setNewTag(""); // clear input
      getTags(); // refresh list
    });
  };

  return (
    <div className="container">
      <div className="columns">
        {/* LEFT SIDE — TAG LIST */}
        <div className="column is-half">
          <h2 className="title is-4">Existing Tags</h2>

          {tags.length === 0 ? (
            <p>No tags yet.</p>
          ) : (
            tags.map((tag) => (
              <div key={tag.id} className="box">
                {tag.label}
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
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    required
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
