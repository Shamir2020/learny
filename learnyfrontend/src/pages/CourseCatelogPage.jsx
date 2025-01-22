import { useEffect, useState } from 'react'
import './css/courseCatelogPage.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const CourseCatelogPage = ()=>{

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])

    const FetchCourses = async ()=> {
        const response = await fetch('/api/course')

        if (response.ok){
            const data = await response.json()
            setCourses(data)
        }
    }

    const LimitText = (value, limit)=>{

        if (value.length > limit){
            return value.substring(0, limit) + '...</p>'
        }else {
            return value
        }
        
    }


    const ViewCourse = (id)=>{
        navigate(`/course-view-page/${id}`)
    }

    useEffect(()=>{
        FetchCourses()
    },[])
    return (
        <>
        <Navbar />
        <div className="course-catelog-page-container">
            

           {courses && courses.map((course)=>{

            let description = LimitText(course.description, 300)

            const htmlD = {__html:course.description}

            return (
                
                    <div style={{overflow: 'hidden'}} className="course-catelog-page-card">
                    <div className="course-catelog-page-card-row1">
                        <Link to={`/course-view-page/${course._id}`}>
                        <img src={course.courseImage} alt="" />
                        </Link>
                    </div>
                    
                    <div className="course-catelog-page-card-row2">
                        <h3>{course.title}</h3>
                        <p className='bold-small-text'>{course.courseCode}</p>
                        {/* <p className='grey-small-text'>{course.description}</p> */}
                        <div className='cdescription-container' dangerouslySetInnerHTML={htmlD} style={{overflow: 'hidden'}}></div>

                        <button onClick={()=>ViewCourse(course._id)}  className='create-btn stylish-btns'>View course</button>
                    </div>

                </div>
               
            )
           })}

        </div>

        <Footer />
        
        </>
    )
}

export default CourseCatelogPage