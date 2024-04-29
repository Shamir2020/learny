import { useState, useEffect, useRef } from "react"
import {toast} from 'react-hot-toast'
import { useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import JoditEditor from "jodit-react"
const DepartmentForm = ()=> {

    const editor = useRef(null)
    const location = useLocation()

    let categoryData = location.state

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [categoryImage, setImage] = useState('')
    

    const navigate = useNavigate()

    
    useEffect(()=>{
        if (categoryData[0] == 'update'){
            setCategory(categoryData[1].category)
            setDescription(categoryData[1].description)
            // setImage(categoryData[1].categoryImage)
        }
        
    },[])

    const submitForm = async (e)=>{
        e.preventDefault()
        if (categoryData[0] == 'update'){

            const id = categoryData[1]._id
            if (!category) {
                toast.error('Fill up category field')
            }
            else if (!description){
                toast.error('Fil up description field')
            }

            else {

                var formData = new FormData()

                formData.append('title',category)
                formData.append('description', description)
                formData.append('departmentPic', categoryImage)

                axios.patch(`/api/department/${id}`, formData, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then(res=>{
                    if (res.status == 200){
                        toast.success('Department updated successfully')
                        navigate('/admin-department-page')
                    }
                    else {
                        toast.error('Department not updated')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
        else if (categoryData[0] == 'create'){
            if (!category) {
                toast.error('Fill up category field')
            }
            else if (!description){
                toast.error('Fil up description field')
            }
            else if (!categoryImage){
                toast.error('Upload image')
            }
            else {

                var formData = new FormData()

                formData.append('title',category)
                formData.append('description', description)
                formData.append('departmentPic', categoryImage)

                axios.post('/api/department', formData, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then(res=>{
                    if (res.status == 200){
                        toast.success('Department created successfully')
                        navigate('/admin-department-page')
                    }
                    else {
                        toast.error('Department could not be created')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })

                
            }
        }
    }
    return (
        <div className="update-category-container">
            <h3>{categoryData[0]} Department Form</h3>
            <form action="">
                <label htmlFor="category">Department name</label>
                <input type="text" name="category" autoComplete="off" value={category} onChange={(e)=>setCategory(e.target.value)} />

                <label htmlFor="description">Description</label>
                <JoditEditor 
                    ref={editor}
                    value={description}
                    onChange={newContent=>setDescription(newContent)}
                />


                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage"  onChange={(e)=>setImage(e.target.files[0])}/>

                <button onClick={submitForm} className="update-btn">{categoryData[0]} Department</button>
            </form>
        </div>
    )
}

export default DepartmentForm