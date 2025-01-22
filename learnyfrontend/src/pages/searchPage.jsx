import { useEffect, useState } from 'react'
import './css/courseCatelogPage.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const SearchPage = () => {

    const navigate = useNavigate()

    const [courses, setCourses] = useState([])

    const params = useParams()

    const keyword = params.keyword

    const FetchSearchedCourses = async () => {
        const response = await fetch(`/api/search/${keyword}`)

        if (response.ok) {
            const data = await response.json()
            setCourses(data)
        }
    }

    const LimitText = (value, limit) => {

        if (value.length > limit) {
            return value.substring(0, limit) + '...</p>'
        } else {
            return value
        }

    }


    const ViewCourse = (id) => {
        navigate(`/course-view-page/${id}`)
    }

    useEffect(() => {
        FetchSearchedCourses()
    }, [])
    return (
        <>
            <Navbar />
            <div className="learny-container">
            <h3 style={{ textAlign: 'center' }}>Showing results for "{keyword}"</h3>
            <div className="course-catelog-page-container">

                {courses.length !=0 ? <>{courses && courses.map((course) => {

                    let description = LimitText(course.description, 300)

                    const htmlD = { __html: course.description }

                    return (

                        <div style={{ overflow: 'hidden' }} className="course-catelog-page-card">
                            <div className="course-catelog-page-card-row1">
                                <Link to={`/course-view-page/${course._id}`}>
                                    <img src={`http://localhost:3000/${course.courseImage}`} alt="" />
                                </Link>
                            </div>

                            <div className="course-catelog-page-card-row2">
                                <h3>{course.title}</h3>
                                <p className='bold-small-text'>{course.courseCode}</p>
                                {/* <p className='grey-small-text'>{course.description}</p> */}
                                <div className='cdescription-container' dangerouslySetInnerHTML={htmlD} style={{ overflow: 'hidden' }}></div>

                                <button onClick={() => ViewCourse(course._id)} className='create-btn stylish-btns'>View course</button>
                            </div>

                        </div>

                    )
                })}</> : <><div className="no-search-result"><h2>No course found</h2></div></>}

            </div>
            </div>

            <Footer />
        </>
    )
}

export default SearchPage