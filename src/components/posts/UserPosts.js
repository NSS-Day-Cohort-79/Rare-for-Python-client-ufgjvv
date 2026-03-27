import { useEffect, useState } from "react"
import { getUserPostsByToken } from "../../managers/postManager"
import { Link } from "react-router-dom"
import { deletePost } from "../../managers/postManager"


// get user posts
// useEffect to get user posts watching the token
// sort array by publication_date
// add a button that will Link to create-post
// map() to display userPosts in html format
// each post will have a settings/edit button and delete button
    // edit button will navigate to edit post page
    // delete button will delete the post

export const UserPosts = ({ token }) => {
    const [userPosts, setUserPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        getUserPostsByToken(token).then(setUserPosts)
    }, [token])

    useEffect(() => {
        if (userPosts.length > 0) {
            setIsLoading(false)
        }
    }, [userPosts])

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

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(postId).then(() => {
                getUserPostsByToken(token).then(setUserPosts)
            })
        }
    }

    if (isLoading) {
        return (
            <div>
                <div>
                    <h1>My Posts</h1>
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
                <h1>My Posts</h1>
            </div>
            <div>
                <Link to={"/create-post"}><button>Add Post</button></Link>
            </div>
            <div>
                {userPosts.map((post) => {
                    return (
                        <div>
                            <div>{post.title}</div>
                            <div>Publication Date: {formatDateTime(post.publication_date)}</div>
                            <div>
                                <img src={post.image_url} alt="An example for posts" />
                            </div>
                            <div>Author: {post.first_name} {post.last_name}</div>
                            <div>Category: {post.label}</div>
                            <Link to={`/posts/${post.id}/edit`}><button>Edit</button></Link>
                            <button onClick={()=> handleDelete(post.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}