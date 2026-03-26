import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryById, updateCategory } from "../../managers/categoryManager"

export const EditCategory = () => {
    const { categoryId } = useParams()
    const [category, setCategory] = useState({})
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        getCategoryById(categoryId).then(setCategory)
    }, [categoryId])

    const handleChange = (e) => {
        e.preventDefault();
 
        if (!category.label.trim()) {
            setError("Category name is required.");
            return;        
        }

        setSubmitting(true)
        setError("")

        updateCategory(category).then(() => {
            setError("")
            setSubmitting(false)
            navigate("/categories")
        })
    }

    return (
        <div>
            <h1>Edit Category</h1>
        
            <form onSubmit={handleChange}>
                <div>
                <label htmlFor="category-label">Category Label</label>
                <input
                    type="text"
                    value={category.label}
                    onChange={(e) => {
                        const copy = {...category}
                        copy.label = e.target.value
                        setCategory(copy)
                    }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
        
                <div>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save"}
                </button>
                <button type="button" disabled={submitting}>
                    Cancel
                </button>
                </div>
            </form>
        </div>
    )
}