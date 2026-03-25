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
                <div>
                    <h1>All Posts</h1>
                </div>
                <div>
                    <Link to={"/create-post"}><button>Add Post</button></Link>
                </div>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>All Posts</h1>
            </div>
            <div>
                <Link to={"/create-post"}><button>Add Post</button></Link>
            </div>
            <div>
                {allPosts.map((post) => {
                    return (
                        <div>
                            <div>{post.title}</div>
                            <div>Publication Date: {formatDateTime(post.publication_date)}</div>
                            <div>
                                <img src={post.image_url} alt="An example for posts" />
                            </div>
                            <div>Author: {post.first_name} {post.last_name}</div>
                            <div>Category: {post.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}