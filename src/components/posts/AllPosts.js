import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../managers/postManager"

export const AllPosts = ({ token }) => {
    const [allPosts, setAllPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getAllPosts().then(setAllPosts)
    }, [token])

    useEffect(() => {
        if (allPosts.length > 0) {
            setIsLoading(false)
        }
    }, [allPosts])

    const formatDateTime = (dateTime) => {
        if (!dateTime) return ""
        const date = new Date(dateTime)
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    if (isLoading) {
        return (
            <div>
                <h1>All Posts</h1>
                <Link to={"/create-post"}><button>Add Post</button></Link>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <h1>All Posts</h1>
            <Link to={"/create-post"}><button>Add Post</button></Link>
            <div>
                {allPosts.map((post) => (
                    <div key={post.id}>
                        <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div>{post.title}</div>
                            <div>Publication Date: {formatDateTime(post.publication_date)}</div>
                            <div>
                                <img src={post.image_url} alt="Post" style={{ maxWidth: "100%" }} />
                            </div>
                            <div>Author: {post.first_name} {post.last_name}</div>
                            <div>Category: {post.label}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}