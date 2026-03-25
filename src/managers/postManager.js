export const postPost = (post) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(post)
    })
<<<<<<< HEAD
=======
}

export const getUserPostsByToken = (token) => {
    return fetch(`http://localhost:8088/posts?user_id=${token}&_expand=user&_expand=category`).then(res => res.json())
>>>>>>> develop
}