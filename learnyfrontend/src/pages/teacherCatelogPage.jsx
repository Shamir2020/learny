import { useEffect, useState } from 'react'
import './css/teacherCatelogPage.css'

import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const TeacherCatelogPage = () => {


    const navigate = useNavigate()

    const [teachers, setTeachers] = useState([])

    const FetchTeacherData = async () => {
        const response = await fetch('/api/random/teachers')

        if (response.ok) {
            const data = await response.json()

            setTeachers(data)

        }
        else {
            toast.error('Data could not be fetched')
        }
    }

    const ViewCourses = (id) => {
        navigate(`/teacher-course-catelog/${id}`)
    }

    useEffect(() => {
        FetchTeacherData()
    }, [])

    return (
        <>
            <Navbar />

            <div className="learny-container">
                <div className="teacher-catelog-page-container">
                    <h2>This is teacher catelog page</h2>

                    {teachers && teachers.map((teacher) => {
                        return (
                            <div className="teacher-catelog-card">
                                <img src={`http://localhost:3000/${teacher.profile.profilePic}`} alt="" />
                                <h3>{teacher.name}</h3>
                                <p>Lecturer, Voboghure University</p>
                                <button onClick={() => ViewCourses(teacher._id)} className='stylish-btns' >View his courses</button>
                            </div>
                        )
                    })}

                </div>
            </div>

            <Footer />
        </>
    )
}

export default TeacherCatelogPage