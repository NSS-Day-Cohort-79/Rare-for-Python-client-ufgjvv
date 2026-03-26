import { useEffect, useState } from "react";
import { getCategories } from "../../managers/categoryManager";
import { getTags } from "../../managers/tagManager";
import { postPost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";

export const CreatePost = ({ token }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    publication_date: "",
    image_url: "",
    content: "",
    approved: false,
  });

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories);
    getTags().then(setTags);
  }, [token]);

  const handlePublish = () => {
    if (category && newPost.title && newPost.image_url && newPost.content) {
      const post = {
        user_id: token,
        category_id: category,
        title: newPost.title,
        publication_date: new Date(),
        image_url: newPost.image_url,
        content: newPost.content,
        approved: newPost.approved,
        tags: tag,
      };

      postPost(post).then(() => {
        navigate("/");
      });
    } else {
      window.alert(
        "Please make sure all fields are filled out before publishing",
      );
    }
  };

  return (
    <div>
      <div>
        <h1>New Post</h1>
      </div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              const copy = { ...newPost };
              copy.title = e.target.value;
              setNewPost(copy);
            }}
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="Image URL"
            onChange={(e) => {
              const copy = { ...newPost };
              copy.image_url = e.target.value;
              setNewPost(copy);
            }}
          />
        </div>
        <div>
          <textarea
            placeholder="Article content"
            onChange={(e) => {
              const copy = { ...newPost };
              copy.content = e.target.value;
              setNewPost(copy);
            }}
          ></textarea>
        </div>
        <div>
          <select
            onChange={(e) => {
              setCategory(parseInt(e.target.value));
            }}
          >
            <option value="0">Category Select</option>
            {categories.map((cat) => {
              return <option value={cat.id}>{cat.label}</option>;
            })}
          </select>
        </div>
        <div>
          {tags.map((t) => {
            return (
              <div>
                <input
                  type="checkbox"
                  value={t.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTag((prev) => [...prev, t.id]);
                    } else {
                      setTag((prev) => prev.filter((item) => item !== t.id));
                    }
                  }}
                />{" "}
                {t.label}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button onClick={handlePublish}>Publish</button>
      </div>
    </div>
  );
};
