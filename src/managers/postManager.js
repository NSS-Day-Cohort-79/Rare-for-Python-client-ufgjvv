// /src/managers/postManager.js

export const postPost = (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(post)
    })
}

// Fetch posts for a specific user
export const getUserPostsByToken = (userId) => {
    return fetch(`http://localhost:8088/posts?user_id=${userId}`)
        .then(res => res.json())
}

// Fetch all posts
export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
}