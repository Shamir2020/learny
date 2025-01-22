import { useEffect, useState } from 'react'
import './css/studentDashboard.css'

import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

const StudentDashboard = ()=>{

    const LimitText = (value, limit)=>{

        if (value.length > limit){
            return value.substring(0, limit) + '...'
        }else {
            return value
        }
        
    }
    

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const decode = jwtDecode(token)
    const id = decode.id
    const [courses, setCourses] = useState([])

    const FetchCourses = async ()=>{
        const response = await fetch(`/api/course/user/${id}`)
        if (response.ok){
            const data = await response.json()
            setCourses(data.courses)
        }
        else {
            toast.error('Course data could not be found')
        }
    }
    useEffect(()=>{
        if (!token){
            navigate('/')
            toast.error('Authenticate first')
        }
        FetchCourses()
    },[])

    const GoToCoursePage = (id)=>{
        navigate(`/course-inside-page/${id}`)
    }

    return (
        <div class="student-dashboard-container">
        <h2>You're enrolled in these courses</h2>
        

        {courses && courses.map((course)=>{
            const description = {__html: course.description}
            return (
                
                <div className="admin-course-card">
                                
                        <div className="admin-course-card-col1">
                            <img src={course.courseImage} alt="" />
                        </div>
                        <div className="admin-course-card-col2">
                        <h3>{course.title}</h3>
                        <p>{course.courseCode}</p>
                        <div dangerouslySetInnerHTML={description}></div>
                        <div className="category-btns-container">
                        <button onClick={(e)=>GoToCoursePage(course._id)} className="category-edit category-btns" >Continue Learning</button>
                                    
                        </div>
                        </div>
                </div>
            )
        })}
        
        
    </div>
    )
}

export default StudentDashboard