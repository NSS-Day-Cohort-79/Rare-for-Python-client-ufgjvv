import { useEffect,useState } from "react";
import { getCategories } from "../../managers/categoryManager";

export const CategoryList = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
    }, [])



    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {categories.map(category => (
                    <li key ={category.id}> {category.label}</li>
                ))}
            </ul>
        </div>
    )
}