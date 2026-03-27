import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteCategory,
  getCategories,
} from "../../managers/HandleCategoryManager";

export const CategoryList = ({ token }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, [token]);

  return (
    <div>
      <h2>Categories</h2>
      <div>
        <Link to={"/create-category"}>
          <button>Create Category</button>
        </Link>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {" "}
            {category.label}{" "}
            <Link to={`/edit-category/${category.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
