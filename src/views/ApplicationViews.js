import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CategoryList } from "../components/category/CategoryList";
import { CreatePost } from "../components/posts/CreatePost";
import CreateCategory from "../components/category/createCategory";
import { TagManager } from "../components/tags/TagManager";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />

      {/* Protected Routes */}
      <Route element={<Authorized token={token} />}>
        <Route path="/categories" element={<CategoryList />} />
        {/* Add Routes here */}
        <Route path="create-post" element={<CreatePost token={token} />} />
        <Route path="/tags" element={<TagManager />} />

        <Route
          path="create-category"
          element={<CreateCategory token={token} />}
        />
      </Route>
    </Routes>
  );
};
