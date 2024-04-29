import { useNavigate } from "react-router-dom"
import {toast} from 'react-hot-toast'
import { useState, useEffect } from "react"

const AdminDepartment = ()=>{

    const navigate = useNavigate()
    
    const [departments, setDepartments] = useState([])

    const moveToUpdateForm = (info)=>{
        navigate('/admin-department-form', {state: info})
    }

    const moveToCreateForm = () => {
        navigate('/admin-department-form', {state: ['create']})
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
        const response = await fetch(`/api/department/${id}`,{
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
            navigate('/admin-department-page')
        }
    }
    const FetchDepartments = async ()=>{
        const response = await fetch('/api/department')
        if (response.ok){
            const data = await response.json()

            setDepartments(data)

            console.log(data)
        }
        else {
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        FetchDepartments()
    },[])
    return (
        <div className="admin-course-category-page-container">
            <h3>Admin Department Page</h3>

            

            {departments && departments.map(function (department, index){
                const desc = {__html:department.description}
                return (
                    <div className="admin-course-category-card">


                    <div className="deletePromptContainer">
                        <h2>Are you sure to delete this department ?</h2>
                        <div>
                            <button onClick={()=>{deleteCategoryRequest(department._id, index)}} className="yes">Yes</button>
                            <button onClick={()=>hideDeletePrompt(index)} className="no">No</button>
                        </div>
                    </div>
                    <div className="category-card-col1">
                        <img src={`http://localhost:3000/${department.departmentPic}`} alt="error" />
                    </div>
                    <div className="category-card-col2">
                        <h4>{department.title}</h4>
                        <div dangerouslySetInnerHTML={desc}></div>
                        <div className="category-btns-container">
                       
                        <button onClick={()=>moveToUpdateForm(["update",department])} className="category-edit category-btns">Edit</button>
                        <button onClick={()=>showDeletePrompt(index)} className="category-delete category-btns">Delete</button>
                        </div>
                    </div>
                    </div>
                )
            })}

            <button onClick={moveToCreateForm} className='create-btn stylish-btns1'>Create a department</button>
        
        </div>
    )
}

export default AdminDepartment