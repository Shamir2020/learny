import { useEffect, useState } from 'react'
import './css/teacherDashboard.css'
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const TeacherCourses = () => {

    const LimitText = (value, limit) => {

        if (value.length > limit) {
            return value.substring(0, limit) + '...'
        } else {
            return value
        }

    }

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])

    const decode = jwtDecode(localStorage.getItem('token'))

    const id = decode.id

    const fetchCourses = async () => {
        const response = await fetch(`/api/course/user/${id}`)
        if (response.ok) {
            const data = await response.json()

            setCourses(data.courses)
            console.log(data.courses)
        }
    }
    useEffect(() => {
        fetchCourses()
    }, [])

    const goToInside = (id) => {
        navigate(`/course-inside-page/${id}`)
    }

    return (
        <div className="learny-container">
            <Navbar />
            <div className="teacher-dashboard-container">
                <h3>You're teaching these courses</h3>


                {courses && courses.map((course) => {
                    
                    const description = { __html: course.description }

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
                                    <button onClick={() => goToInside(course._id)} className="category-edit category-btns" >View</button>

                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
            <Footer />
        </div>
    )
}

export default TeacherCourses