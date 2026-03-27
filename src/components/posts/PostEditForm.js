import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../managers/postManager";
import { getCategories } from "../../managers/CategoryManager";

export const PostEditForm = () => {
    const [categories, setCategories] = useState([])
    const [currentPost, setCurrentPost] = useState({
        title: "",
        content: "",
        category_id: "",
        image_url: "",
    })
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategories().then(data => setCategories(data))
        getPostById(postId).then(data => setCurrentPost(data))
    }, [])

    const handleSave = () => {
        updatePost(postId, currentPost).then(() =>{
            navigate(`/post/${postId}`)
        })
    }

    return (
        <div>
                <h2>Edit Post</h2>
            <input
                type="text"
                value= {currentPost.title}
                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value })}
                placeholder="Title"
            />
            <textarea
                value = {currentPost.content}
                onChange = {(e)=> setCurrentPost({...currentPost, content: e.target.value})}
                placeholder="Post Content"
            />
            <input
                type="text"
                value={currentPost.image_url}
                onChange={(e)=> setCurrentPost({...currentPost,image_url: e.target.value})}
                placeholder="Image URL"
            />
            <select
                value={currentPost.category_id}
                onChange={(e) => setCurrentPost({...currentPost, category_id: parseInt(e.target.value)})}>
                <option value="0">Select a Category</option>
                {categories.map(category =>(
                    <option key={category.id} value={category.id}>{category.label}</option>
                ))}
            </select>
            <button onClick={handleSave}>Save </button>
            <button onClick={() => navigate("/posts")}>Cancel</button>
        </div>
    )

}