import { useEffect, useState } from 'react'
import './css/adminCourseCategoryPage.css'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'

const AdminCourseCategoryPage = ()=> {

    const [categories, setCategories] = useState([])
    const token = localStorage.getItem('token')

    const navigate = useNavigate()
    const BaseUrl = 'http://localhost:3000'


    const moveToUpdateForm = (info)=>{
        navigate('/admin-category-form', {state: info})
    }

    const moveToCreateForm = () => {
        navigate('/admin-category-form', {state: ['create']})
    }

    const showDeletePrompt = (index)=> {
        let deletePromptContainerElements = document.querySelectorAll('.deletePromptContainer')
        
        deletePromptContainerElements[index].style.display = 'flex'
        console.log('appear now')
        
    }
    const hideDeletePrompt = (index)=>{
        let deletePromptContainerElements = document.querySelectorAll('.deletePromptContainer')
        
        deletePromptContainerElements[index].style.display = 'none'
    }

    const deleteCategoryRequest = async (id, index)=> {
        console.log(id)
        const response = await fetch(`/api/category/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.ok){
            toast.success('Category deleted successfully')
            window.location.reload()
            hideDeletePrompt(index)
        }
        else {
            const error = await response.json()
            toast.error(error.error)
            navigate('/admin-category-page')
        }
    }

    useEffect(()=>{
        const FetchCategoriesData = async ()=>{
            const response = await fetch('/api/category',{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok){
                const data = await response.json()
                setCategories(data)
                
            }
        }
        FetchCategoriesData()
    },[])

    return (
        <div className="admin-course-category-page-container">
            <h3>Admin Course Category Page</h3>

            

            {categories && categories.map(function (category, index){
                return (
                    <div className="admin-course-category-card">


                    <div className="deletePromptContainer">
                        <h2>Are you sure to delete this category ?</h2>
                        <div>
                            <button onClick={()=>{deleteCategoryRequest(category._id, index)}} className="yes">Yes</button>
                            <button onClick={()=>hideDeletePrompt(index)} className="no">No</button>
                        </div>
                    </div>
                    <div className="category-card-col1">
                        <img src={`${BaseUrl}/${category.categoryImage}`} alt="error" />
                    </div>
                    <div className="category-card-col2">
                        <h4>{category.category}</h4>
                        <p>{category.description}</p>
                        <div className="category-btns-container">
                       
                        <button onClick={()=>moveToUpdateForm(["update",category])} className="category-edit category-btns">Edit</button>
                        <button onClick={()=>showDeletePrompt(index)} className="category-delete category-btns">Delete</button>
                        </div>
                    </div>
                    </div>
                )
            })}

            <button onClick={moveToCreateForm} className='create-btn stylish-btns1'>Create a category</button>
        
        </div>
    )
}

export default AdminCourseCategoryPage