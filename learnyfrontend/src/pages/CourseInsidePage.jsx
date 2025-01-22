import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

import { Link } from 'react-router-dom'
import './css/courseInsidePage.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'



const CourseInsidePage = ()=>{
    const params = useParams()
    const id = params.id


    const navigate = useNavigate()
    const decode = jwtDecode(localStorage.getItem('token'))

    const role = decode.role

    const userId = decode.id

    const [course, setCourse] = useState({})

    const [courseContents, setCourseContents] = useState([])


    const [viewMode, setViewMode] = useState('teacher')


    const [announcements, setAnnouncements] = useState([])

    const [teachers, setTeachers] = useState([])

    const FetchCourse = async ()=>{
        const response = await fetch(`/api/course/view-page/${id}`)
        if (response.ok){
            const data = await response.json()
            setCourse(data)
            setTeachers(data.teachers)
            console.log(data.teachers)
        }
        else {
            toast.error('Something went wrong')
        }
        
    }


    const FetchCourseContents = async ()=>{
        const response = await fetch(`/api/courseContent/specific/${id}`)
        if (response.ok){
            const data = await response.json()
            setCourseContents(data)
        }
        else {
            toast.error('Something went wrong')
        }
    }

    const ViewLecture = (id)=>{

    }

    const goToCourseContentForm = (array)=>{

        navigate(`/teacher-course-content-form/${course._id}`, {state: array})
    }
    const toggleLectureContainerDisplay = (index)=>{

        const number = document.querySelectorAll('.lectures-container').length / 2

        if (role == 'teacher' && viewMode == 'student') index = index + number

        console.log(`Index = ${index}`)

        const lectureContainerElement = document.querySelectorAll('.lectures-container')[index]

        const plusButtonIcon = document.querySelectorAll('.fa-plus')[index]
        const xButtonIcon = document.querySelectorAll('.fa-x')[index]
        
        

        if (lectureContainerElement.style.display === 'none'){
            lectureContainerElement.style.display = 'flex'
            xButtonIcon.style.display = 'block'
            plusButtonIcon.style.display = 'none'


        }else {
            lectureContainerElement.style.display = 'none'
            xButtonIcon.style.display = 'none'
            plusButtonIcon.style.display = 'block'
        }
    }

    const showDeletePromptContainer = (index)=>{
        
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'flex'

    }

    const hideDeletePromptContainer = (index)=>{
       
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'none'
    }

    const deleteContentRequest = async (id , index)=>{
        const response = await fetch(`/api/courseContent/delete/${id}`,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (response.ok){
            toast.success('Course content deleted successfully')
            window.location.reload()
        }
        else {
            const data = await response.json()
            toast.error(data.error)
            hideDeletePromptContainer(index)
        }
    }

    const goToLectureForm = (id, array)=>{
        navigate(`/teacher-lecture-form/${id}`, {state: array})
    }


    const changeView = (value)=>{
        console.log(value)

        setViewMode(value)
        
        if (value === 'teacher'){
            document.querySelector('.teacher-view').style.display = 'block'
            document.querySelector('.student-view').style.display = 'none'
        }
        else {
            document.querySelector('.teacher-view').style.display = 'none'
            document.querySelector('.student-view').style.display = 'block'
        }

    }

    const FetchCourseAnnouncements = async ()=>{
        const response = await fetch(`/api/announcement/course/${id}`)

        if (response.ok){
            const data = await response.json()
            setAnnouncements(data)
        }
    }

    const InitiateChat = async (teacherId, studentId) =>{
        console.log(teacherId, studentId)

        const response = await fetch('/api/conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: studentId,
                receiverId: teacherId
            })
        })
        if (response.ok){
            navigate('/messenger-page/all')
        }
        else {
            const data = await response.json()
            toast.error(data.error)
        }
    }

    const goToCourseAnnouncementPage = (id)=>{
        navigate(`/course-announcement-page/${id}`)
    }
    useEffect(()=>{
        FetchCourse()
        FetchCourseContents()
        FetchCourseAnnouncements()
    },[])

    const goToConsultation = (id)=>{

        navigate(`/teacher-consultation/${id}`)

    }
    if (role == 'teacher'){
        return (
            <>

                <Navbar />

                <div className="learny-container">
                <div className="select-view-container">
                    <select name="" id="" onChange={(e)=>changeView(e.target.value)}>
                        <option value="student">Student view</option>
                        <option value="teacher" selected>Teacher view</option>
                    </select>
                </div>

                <div className="course-inside-page teacher-view">
                <div>
                <h2>{course.title}</h2> 
                
                
                </div>
    
                {courseContents && courseContents.map((content, index)=>{
                    return (
                        <div  className="course-content-card">
                            <button className='close-btns' onClick={()=>toggleLectureContainerDisplay(index)}>
                                <i className="fa-solid fa-plus"></i><i class="fa-solid fa-x"></i>
                            </button>
    
                            <div className="deletePromptContainer">
                                <h2>Are you sure to delete this course content ?</h2>
    
                                <div>
                                    <button onClick={()=>deleteContentRequest(content._id, index)} className="yes">Yes</button>
                                    <button onClick={()=>hideDeletePromptContainer(index)} className="no">No</button>
                                </div>
                            </div>
    
                            <h3>{content.title}</h3>
                            <div className="btns-container">
                            <button onClick={()=>ViewLecture(content._id)} className="category-edit category-btns">View</button>
                            <button onClick={()=>goToCourseContentForm(['Update', content])} className="category-edit category-btns">Edit</button>
                            <button onClick={()=>showDeletePromptContainer(index)} className="category-delete category-btns">delete</button>
                            </div>
    
                            <div className="lectures-container">
                                {content.lectures && content.lectures.map((lecture, index)=>{
                                    return (
                                        <div className="lecture-card">
                                        <Link to={`/lecture-inside-page/${lecture._id}`}><h3>{lecture.title} {lecture.lectureNumber}</h3></Link>
                                        <button  className="lecture-custom-btns">View</button>
                                        <button onClick={()=>goToLectureForm(content._id, ['Update', lecture])} className="lecture-custom-btns">Edit</button>
                                        <button  className="lecture-custom-btns">delete</button>
                                </div>
                                    )
                                })}
                            </div>
                            <button onClick={()=>goToLectureForm(content._id, ['Create'])} className="create-lecture-btn stylish-btns">Create Lecture</button>
                        </div>
                    )
                })}
    
                <button onClick={()=>goToCourseContentForm(['Create', course])} className="create-btn stylish-btns">Create Course Content</button>

                <button onClick={()=>goToCourseAnnouncementPage(course._id)} className="create-btn stylish-btns1">Manage Announcements</button>
                
    
            </div>


            <div className="course-inside-page student-view">
                <h2>{course.title}</h2>
    
                {courseContents && courseContents.map((content, index)=>{
                    return (
                        <div  className="course-content-card">
                            <button className='close-btns' onClick={()=>toggleLectureContainerDisplay(index)}>
                                <i className="fa-solid fa-plus"></i><i class="fa-solid fa-x"></i>
                            </button>
    
                            <h3>{content.title}</h3>
                           
    
                            <div className="lectures-container">
                                {content.lectures && content.lectures.map((lecture, index)=>{
                                    return (
                                        <div className="lecture-card">
                                        <Link to={`/lecture-inside-page/${lecture._id}`}><h3>{lecture.title} {lecture.lectureNumber}</h3></Link>
                                        
                                </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    )
                })}


                <div className="course-announcement-container">
                <h2>Announcements</h2>
                {announcements && announcements.map((announcement)=>{
                    const htmlD = {__html:announcement.description}
                    return (
                        <div className="course-announcement-card">
                            <h3>{announcement.title}</h3>
                            <p>Announced at - {announcement.date}</p>
                            <p>Deadline - {announcement.expiryDate}</p>
                            <div dangerouslySetInnerHTML={htmlD}></div>
                        </div>
                    )
                })}
            </div>
                                
            </div>
                </div>

                <Footer />
            
            </>


            
            


        )
    }

    else {
        return (
            <>
                <Navbar />

                <div className="learny-container">
                <div className="course-inside-page">
                <h2>{course.title}</h2>
    
                {courseContents && courseContents.map((content, index)=>{
                    return (
                        <div  className="course-content-card">
                            <button className='close-btns' onClick={()=>toggleLectureContainerDisplay(index)}>
                                <i className="fa-solid fa-plus"></i><i class="fa-solid fa-x"></i>
                            </button>
    
                           
    
                            <h3>{content.title}</h3>
                           
    
                            <div className="lectures-container">
                                {content.lectures && content.lectures.map((lecture, index)=>{
                                    return (
                                        <div className="lecture-card">
                                        <Link to={`/lecture-inside-page/${lecture._id}`}><h3>{lecture.title} {lecture.lectureNumber}</h3></Link>
                                        
                                </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    )
                })}
    
            
            <div className="course-announcement-container">
                <h2>Announcements</h2>
                {announcements && announcements.map((announcement)=>{
                    const htmlD = {__html:announcement.description}
                    return (
                        <div className="course-announcement-card">
                            <h3>{announcement.title}</h3>
                            <p>Announced at - {announcement.date}</p>
                            <p>Deadline - {announcement.expiryDate}</p>
                            <div dangerouslySetInnerHTML={htmlD}></div>
                        </div>
                    )
                })}
            </div>

            <div className="chat-initiator-container">
                <h2>Chat with instructor</h2>
                
                {teachers && teachers.map((teacher)=>{
                    return (
                        <div className="teacher-card">
                            <div className="teacher-card-col1">
                                <img src={`http://localhost:3000/${teacher.profile.profilePic}`} alt="" />
                            </div>
                            <div className="teacher-card-col2">
                            <h3>{teacher.name}</h3>
                            <button onClick={()=>InitiateChat(teacher._id, userId)} className='stylish-btns'>Chat with him</button>
                            <button style={{margin: '10px 0'}} onClick={()=>goToConsultation(teacher._id)} className='stylish-btns'>Book Consultation</button>
                            </div>
                        </div>
                    )
                })}

            </div>
                
    
            </div>
                </div>

                <Footer />
            </>
        )
    }
}

export default CourseInsidePage