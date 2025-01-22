import { useEffect, useState } from 'react'
import './css/adminDashboard.css'

import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import Navbar from '../components/navbar'
import Footer from '../components/footer'


const LimitText = (value, limit)=>{

    if (value.length > limit){
        return value.substring(0, limit) + '...'
    }else {
        return value
    }
    
}

const AdminCoursePage = ()=>{

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const FetchCourses = async ()=> {
        const response = await fetch('/api/course')

        if (response.ok){
            const data = await response.json()
            setCourses(data)
        }
    }
    useEffect(()=>{
        FetchCourses()
    },[])

    const moveToUpdateCourse = (info)=>{
        navigate('/admin-course-form',{state: info})
        
    }

    const moveToCreateForm = (info)=>{
        navigate('/admin-course-form',{state: info})
    }

    const onDeletePrompt = (index)=>{
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'flex'
    }

    const hideDeletePrompt = (index)=>{
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'none'
    }
    const submitDeleteRequest = async (id, index)=>{
        const response = await fetch(`/api/course/${id}`,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.ok){
            
            toast.success('Course has been deleted successfully')
            window.location.reload()
        }
        else {
            toast.error("Course could not be deleted")
        }
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'none'
    }
    return (
        <>
        <Navbar/>
        <div className="admin-dashboard-container learny-container">
                    <h2>Admin's Dashboard</h2>
                    
                    {courses && courses.map((course, index)=>{
                        let description = {__html: course.description}
                        return (
                            <div className="admin-course-card">
                                <div className="deletePromptContainer">
                                    <h2>Are you sure to delete this course?</h2>
                                    <button onClick={()=>hideDeletePrompt(index)} className="no">No</button>
                                    <button onClick={()=>submitDeleteRequest(course._id, index)} className="yes">Yes</button>
                                </div>
                                <div className="admin-course-card-col1">
                                    <img src={course.courseImage} alt="" />
                                </div>
                                <div className="admin-course-card-col2">
                                    <h3>{course.title}</h3>
                                    <p>{course.courseCode}</p>
                                    <div dangerouslySetInnerHTML={description}></div>
                                    <div className="category-btns-container">
                                    <button onClick={()=>moveToUpdateCourse(['Update',course])} className="category-edit category-btns" >Edit</button>
                                    <button onClick={()=>onDeletePrompt(index)} className="category-edit category-btns" >Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <button onClick={()=>moveToCreateForm(['Create'])} className='create-btn stylish-btns'>Add a Course</button>
                {/* <!--  Add more cards for other functionalities --> */}
            </div>
            <Footer />
        </>
    )
}

export default AdminCoursePage