import { useEffect, useState } from 'react'
import './css/courseViewPage.css'

import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const CourseViewPage = ()=>{

    const navigate = useNavigate()

    const params = useParams()
    const id = params.id

    var role, userId

    if (localStorage.getItem('token') != null){
        const decode = jwtDecode(localStorage.getItem('token'))

        role = decode.role

        userId = decode.id
    }

    const [course, setCourse] = useState({})


    const [CDescription, setCDescription] = useState({__html:''})


    const [reviewText, setReviewText] = useState('')
    const [reviewStar, setReviewStar] = useState('')

    const [reviews, setReviews] = useState([])

    const submitReview = async (e)=>{
        e.preventDefault()

        if (!reviewText){
            toast.error('Fll the Review Text field')
        }
        if (!reviewStar){
            toast.error('Fill the Review Star field')
        }
        const response = await fetch('/api/courseReview',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                courseId: id,
                userId: userId,
                reviewText: reviewText,
                reviewStar: reviewStar

            })
        })

        if(response.ok){
            toast.success("Review has been added")
            window.location.reload()
        }
        else {
            toast.error('Review could not be added')
        }
    }

    const FetchReviews = async ()=>{
        const response = await fetch(`/api/courseReview/${id}`)

        if (response.ok){
            const data = await response.json()

            setReviews(data.reviews)

        }
    }

    const FetchCourse = async ()=>{
        const response = await fetch(`/api/course/view-page/${id}`)
        if (response.ok){
            const data = await response.json()
            setCourse(data)
            setCDescription({__html:data.description})


            console.log(data)
            console.log(`Teacher - ${data.teachers}`)

            if (data.students.includes(userId)){
                navigate(`/course-inside-page/${data._id}`)
            }

            data.teachers.map((teacher)=>{
                if (userId == teacher._id){
                    navigate(`/course-inside-page/${data._id}`)
                }
            })
            

        }
        else {
            toast.error('Something went wrong')
        }
        
    }
    useEffect(()=>{
        FetchCourse()
        FetchReviews()

        

    },[])

    return (
        <>
        <Navbar />

        <div className="learny-container">
        <div className="course-view-page-container">
        
        <div className="row1">
            <div className="col1">
                <h1>{course.title}</h1>
                <h4>{course.courseCode}</h4>
                {role == 'student' && (<button className='enroll-course-btn stylish-btns'>Enroll</button>)}
                
            </div>
            <div className="col2">
            <img src={`http://localhost:3000/${course.courseImage}`} alt="" />
            </div>
        </div>

        <div className="row2">
        <div className='titleContainer'><h2>About this course</h2></div>
        <div dangerouslySetInnerHTML={CDescription}></div>

        <div className="course-teacher-container">
            <div className='titleContainer'><h3>The teachers</h3></div>

            {course.teachers && course.teachers.map(courseTeacher=>{
                return (
                    <div className="course-teacher-card">
                <div className="card-col1"><img src={`http://localhost:3000/${courseTeacher.profile.profilePic}`} alt="error" /></div>
                <div className="card-col2">
                    <h3>{courseTeacher.name}</h3>
                
                    <p>Lecturer at Voboghure University</p>
                </div>
                </div>
                )
            })}


        </div>

        </div>

        <div className="row3">
            <h3>Reviews</h3>
            {reviews && reviews.map(review=>{
                return (
                    <div className="row3-review-card">
                        <div className="review-card-col1">
                            
                            <img src={`http://localhost:3000/${review.user.profile.profilePic}`} alt="" />
                            {review.user.name}
                        </div>
                        <div className="review-card-col2">
                            <h3>{review.reviewText}</h3>
                            <p>{review.reviewStar}</p>
                        </div>
                    </div>
                )
            })}

            <div className="row3-review-creation-container">
                <form action="">
                    <label htmlFor="reviewText">Review Text</label>
                    <textarea value={reviewText} onChange={(e)=>setReviewText(e.target.value)} name="reviewText" id="" cols="30" rows="10"></textarea>

                    <label htmlFor="reviewStar">Review Star</label>
                    <select onChange={(e)=>setReviewStar(e.target.value)} name="reviewStar" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={submitReview}>Add Review</button>
                </form>
            </div>
        </div>

    </div>
        </div>

        <Footer />
        </>
    )
}


export default CourseViewPage