import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8088/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [postId])

    if (!post) {
        return <div>Loading post...</div>
    }

    return (
        <div>
            <h1>{post.title}</h1>

            {post.image_url && (
                <img src={post.image_url} alt={post.title} style={{ maxWidth: "100%" }} />
            )}

            <p>{post.content}</p>

            <p>
                Published on:{" "}
                {post.publication_date
                    ? new Date(post.publication_date).toLocaleDateString("en-US")
                    : "Unknown"}
            </p>

            <p>
                By: {post.author?.full_name || "Unknown Author"}
            </p>

            <p>Category: {post.category || "Unknown"}</p>
        </div>
    )
}