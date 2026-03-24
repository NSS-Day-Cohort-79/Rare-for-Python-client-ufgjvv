// --- FILE CREATED FOR COMMENT FORM (TICKET #7) ---
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment } from "../managers/CommentManager"

export const CommentForm = ({ token }) => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [content, setContent] = useState("")

    const handleSave = (e) => {
        e.preventDefault()

        const newComment = {
            post_id: parseInt(postId),
            author_id: parseInt(token),
            content: content
        }

        createComment(newComment, token)
            .then(() => {
                navigate(`/posts/${postId}/comments`)
            })
    }

    return (
        <form onSubmit={handleSave}>
            <h2>Add Comment</h2>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment..."
            />

            <button type="submit">Submit</button>
        </form>
    )
}