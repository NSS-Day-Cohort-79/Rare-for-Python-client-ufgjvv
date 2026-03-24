// --- FILE CREATED FOR COMMENT FORM (TICKET #7) ---
export const createComment = (comment, token) => {
    return fetch("http://localhost:8088/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
}