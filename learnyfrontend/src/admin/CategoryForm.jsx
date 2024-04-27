import { useEffect, useState } from "react"

import './css/updateCategoryForm.css'
import { useParams, useNavigate, useLocation } from "react-router-dom"
import {toast} from "react-hot-toast"

import axios from 'axios'


const FormCategoryPage = ()=> {

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

                formData.append('category',category)
                formData.append('description', description)
                formData.append('categoryImage', categoryImage)

                axios.patch(`/api/category/${id}`, formData, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then(res=>{
                    if (res.status == 200){
                        toast.success('Category updated successfully')
                        navigate('/admin-category-page')
                    }
                    else {
                        toast.error('Category not updated')
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

                formData.append('category',category)
                formData.append('description', description)
                formData.append('categoryImage', categoryImage)

                axios.post('/api/category', formData, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                .then(res=>{
                    if (res.status == 200){
                        toast.success('Category created successfully')
                        navigate('/admin-category-page')
                    }
                    else {
                        toast.error('Category could not be created')
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
            <h3>{categoryData[0]} Category Page</h3>
            <form action="">
                <label htmlFor="category">Category name</label>
                <input type="text" name="category" autoComplete="off" value={category} onChange={(e)=>setCategory(e.target.value)} />

                <label htmlFor="description">Description</label>
                <textarea name="description" id="" cols="30" rows="10" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>   

                <label htmlFor="categoryImage"></label>
                <input type="file" name="categoryImage"  onChange={(e)=>setImage(e.target.files[0])}/>

                <button onClick={submitForm} className="update-btn">{categoryData[0]}</button>
            </form>
        </div>
    )
}

export default FormCategoryPage