import { useEffect, useState } from 'react'
import './css/courseContentForm.css'

import {toast} from 'react-hot-toast'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

const CourseContentForm = ()=>{

    const location = useLocation()
    const params = useParams()

    const id = params.id
    const navigate = useNavigate()

    const [title, setTitle] = useState('')

    const specialData = location.state

    console.log(specialData)
    
    const submitForm = async (e)=>{
        e.preventDefault()

        if (!title){
            toast.error('Fill the title field')
        }
        else {
            if (specialData[0] == 'Create'){
                const response = await fetch('/api/courseContent',{
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        courseId: id
                    })
                })
                if (response.ok){
                    toast.success('Course Content has been added')
                    navigate('/teacher-courses-dashboard')
                    
                }
                else {
                    toast.error('Something went wrong')
                }
            }
            if (specialData[0] == 'Update'){
                const response = await fetch('/api/courseContent/update',{
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        courseId: id,
                        id: specialData[1]._id
                    })
                })
                if (response.ok){
                    toast.success('Course Content has been Updated')
                    navigate('/teacher-courses-dashboard')
                    
                }
                else {
                    toast.error('Something went wrong')
                }
            }
        }
    }

    useEffect(()=>{
        if (specialData[0] == 'Update') {
            setTitle(specialData[1].title)
        }
    },[])

    

    return (
        <div className="course-content-form-container">
            <h3>{specialData[0]} a course content</h3>
            <form action="">
                <label htmlFor="title">Course Title</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" />

                <button onClick={submitForm} className="create-btn stylish-btns">{specialData[0]} content</button>
            </form>
        </div>
    )
}

export default CourseContentForm