import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getTags, addTagToPost } from "./tagManager"
import { getPostById } from "./postManager"

export const ManageTags = ({ token }) => {
    const { postId } = useParams()
    const navigate = useNavigate
    const [allTags, setAllTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        getTags().then(setAllTags)
        getPostById(postId).then(post => {
            setSelectedTags(post.tags.map(tag => tag.id))
        })
    }, [postId])

    const handleTagChange = (event) => {
        const tagId = parseInt(event.target.value)
        if (event.target.checked) {
            setSelectedTags(prev => [...prev, tagId])
        }
        else {
            setSelectedTags(prev => prev.filter(id => id !== tagId))
        }
    }

    const handleSave = () => {
        addTagToPost(parseInt(postId), selectedTags).then(() => {
            navigate(`/posts/${postId}`)
        })
    }

    return (
        <div>
            <h1>Manage Tags</h1>
            <div>
                {allTags.map(tag => (
                    <div key={tag.id}>
                        <input 
                            type="checkbox" 
                            value={tag.id} 
                            checked={selectedTags.includes(tag.id)} 
                            onChange={handleTagChange}
                        />
                        {tag.label}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => navigate(`/posts/${postId}`)}>Cancel</button>
            </div>
        </div>
    )
}