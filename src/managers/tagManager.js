export const getTags = () => {
    return fetch("http://localhost:8088/tags").then(res => res.json())
}

export const addTagToPost = (postId, tagIds) => {
    return fetch ("http://localhost:8088/post_tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ post_id: postId, tag_ids: tagIds})
    })
}