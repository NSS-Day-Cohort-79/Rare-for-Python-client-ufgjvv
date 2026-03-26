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

export const getUserPostsByToken = (token) => {
    return fetch(`http://localhost:8088/posts?user_id=${token}&_expand=user&_expand=category`).then(res => res.json())
}

export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=category").then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/post/${id}`)
    .then(res => res.json())
}

export const updatePost = (id, updatedPost) => {
    return fetch (`http://localhost:8088/post/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(updatedPost)
    }
    )
}