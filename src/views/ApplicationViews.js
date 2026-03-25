import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { CreatePost } from "../components/posts/CreatePost"
import CreateCategory from "../components/category/createCategory"
import { ManageTags } from "../managers/ManageTags"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="create-post" element={<CreatePost token={token}/>}/>
        <Route path="create-category" element={<CreateCategory token={token}/>}/>
        <Route path="posts/:postId/manage-tags" element={<ManageTags token= {token}/>} />
      </Route>
    </Routes>
  </>
}
