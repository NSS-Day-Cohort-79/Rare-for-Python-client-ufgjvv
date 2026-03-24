import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CreatePost } from "../components/posts/CreatePost"
import CreateCategory from "../components/category/createCategory"

// --- IMPORT ADDED FOR COMMENT FORM (TICKET #7) ---
import { CommentForm } from "./CommentForm"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}

        {/* --- ROUTE ADDED FOR COMMENT FORM (TICKET #7) --- */}
        <Route path="posts/:postId/comments/new" element={<CommentForm token={token} />} />
        <Route path="create-post" element={<CreatePost token={token} />} />

        <Route path="create-category" element={<CreateCategory token={token} />} />

      </Route>
    </Routes>
  </>
}
