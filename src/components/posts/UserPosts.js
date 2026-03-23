import { useEffect, useState } from "react"
import { getUserPostsByToken } from "../../managers/postManager"
import { Link } from "react-router-dom"

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

    useEffect(() => {
        getUserPostsByToken(token).then(setUserPosts)
    }, [token])

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
                            <div>Publication Date: {post.publication_date}</div>
                            <div>{post.image_url}</div>
                            <div>Author: {post.user?.first_name} {post.user?.last_name}</div>
                            <div>Category: {post.category?.label}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}