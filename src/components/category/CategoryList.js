import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../managers/CategoryManager";
import { deleteCategory } from "../../managers/HandleCategoryManager";

export const CategoryList = ({ token }) => {
    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])

    const [showConfirm, setShowConfirm] = useState(false)
    const [categoryId, setCategoryId] = useState(null)

    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
    }, [token])

    useEffect(() => {
        if (showConfirm) {
            const filtered = categories.filter((category) => category.id === categoryId)
            setFilteredCategories(filtered)
        } else {
            setFilteredCategories(categories)
        }
    }, [categories, showConfirm, categoryId])

    const handleDeleteCategory = (id) => {
        setCategoryId(id)
        setShowConfirm(true)
    }

    const confirmDelete = () => {
        deleteCategory(categoryId).then(() => {
            setShowConfirm(false)
            getCategories().then(setCategories)
        })
    }

    return (
        <div>
            <h2>Categories</h2>
            <div>
                <Link to={"/create-category"}><button>Create Category</button></Link>
            </div>
            <ul>
                {filteredCategories.map(category => (
                     <li key ={category.id}> {category.label} {!showConfirm && (
                        <div>
                            <Link to={`/edit-category/${category.id}`}><button>Edit</button></Link> 
                        <button onClick={() => {
                            handleDeleteCategory(category.id)
                        }}>Delete</button>
                        </div>
                     )}
                        {showConfirm && (
                            <div>
                                <p>Are you sure you want to delete {category.label}?</p>
                                <button onClick={confirmDelete}>Yes</button>
                                <button onClick={() => setShowConfirm(false)}>Cancel</button>
                            </div>
                )}
                    </li>
                ))}
            </ul>
        </div>
    )
}