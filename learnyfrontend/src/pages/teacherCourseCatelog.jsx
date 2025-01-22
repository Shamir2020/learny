
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
const TeacherCourseCatelog = ()=>{


    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    const [courses, setCourses] = useState([])

    const [name, setName] = useState('')

    const FetchCourses = async ()=> {
        const response = await fetch(`/api/course/user/${id}`)

        if (response.ok){
            const data = await response.json()
            setCourses(data.courses)
            setName(data.name)
        }
    }

    const LimitText = (value, limit)=>{

        if (value.length > limit){
            return value.substring(0, limit) + '...'
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
        <h2 style={{textAlign:'center'}}>{name}'s courses</h2>
        <div className="course-catelog-page-container">
            

            {courses && courses.map((course)=>{
 
             let description = LimitText(course.description, 300)
 
             return (
                 
                     <div className="course-catelog-page-card">
                     <div className="course-catelog-page-card-row1">
                         <Link to={`/course-view-page/${course._id}`}>
                         <img src={`http://localhost:3000/${course.courseImage}`} alt="" />
                         </Link>
                     </div>
                     
                     <div className="course-catelog-page-card-row2">
                         <h3>{course.title}</h3>
                         <p className='bold-small-text'>{course.courseCode}</p>
                         <p className='grey-small-text'>{description}</p>
 
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


export default TeacherCourseCatelog