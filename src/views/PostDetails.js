import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        fetch(`http://localhost:8088/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [postId])

    return (
        <div>
            <h1>{post.title}</h1>

            {post.image_url && (
                <img src={post.image_url} alt={post.title} />
            )}

            <p>{post.content}</p>

            <p>
                Published on:{" "}
                {post.publication_date
                    ? new Date(post.publication_date).toLocaleDateString()
                    : ""}
            </p>

            <p>
                By: {post.author?.full_name}
            </p>
        </div>
    )
}