import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
//import { CreatePost } from "../components/CreatePost";
import { CreateTag } from "../components/CreateTag.js";
import { TagManager } from "../components/TagManager.js";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />

      {/* Default route (redirect to login if not logged in) */}
      <Route path="/" element={<Login setToken={setToken} />} />

      {/* Protected Routes */}
      <Route element={<Authorized token={token} />}>
        {/* Posts */}
        {/* <Route path="/posts/create" element={<CreatePost />} /> */}

        {/* Tags */}
        <Route path="/tags" element={<TagManager />} />
        <Route path="/tags/create" element={<CreateTag />} />

        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};
