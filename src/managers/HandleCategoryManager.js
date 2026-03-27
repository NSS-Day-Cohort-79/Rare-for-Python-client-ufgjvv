export const getCategoryById = (id) => {
    return fetch(`http://localhost:8088/categories?id=${id}`).then(res => res.json())
}

export const updateCategory = (category) => {
    return fetch(`http://localhost:8088/categories?id=${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(category)
    })
}

export const deleteCategory = (id) => {
    return fetch(`http://localhost:8088/categories/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
}

export const getCategories = () => {
    return fetch("http://localhost:8088/categories")
    .then(res => res.json())
}