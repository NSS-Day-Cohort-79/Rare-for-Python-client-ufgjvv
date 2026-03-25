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

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`).then(res => res.json())
}