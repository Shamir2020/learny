
import student from '../images/student.png'
import './css/home.css'
import './css/stylishBtns.css'

import happy from '../images/happy.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UniversityAnnouncement from '../components/UniversityAnnouncement'
const Home = ()=>{
    const navigate = useNavigate()

    const getStarted = ()=>{
        navigate('/user-selection')
    }

    const [categories, setCategories] = useState([])

    const FetchCategories = async ()=> {
        const response = await fetch('/api/category')

        if (response.ok) {
            const data = await response.json()

            setCategories(data)
        }
    }

    

    useEffect(()=>{
        FetchCategories()

    },[])
    return (
        <div className="home-container">
            <div className="row1">
                <div className="row1Inside">
                    <div className="row1Col1">
                    <img src={happy} alt="" />
                    </div>
                    <div className="row1Col2">
                    <h1>Start learning with Learny</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor deserunt dolorum fugit, recusandae error aut possimus totam officia quae odio laudantium dolore facilis pariatur placeat tempora tempore mollitia explicabo praesentium.</p>
                    <button onClick={getStarted} className='learn-btn stylish-btns stylish-btns'>Learn With Learny</button>
                    </div>
                </div>
            </div>


            <div className="row4">
                <h2>How it works</h2>
                <div className="row4Inside">
                    
                    <div className="row4-card">
                    <div className="row4-logo-container">
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <h3>Sign Up</h3>
                    <p className="small-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Accusantium 
                    </p>
                      
                    </div>
                    
                    <div className="row4-card">
                    <div className="row4-logo-container">
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <h3>Choose</h3>
                    <p className="small-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Accusantium 
                    </p>
                      
                    </div>

                    <div className="row4-card">
                    <div className="row4-logo-container">
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <h3>Enroll in course</h3>

                    <p className="small-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Accusantium 
                    </p>
                      
                    </div>

                    <div className="row4-card">
                    <div className="row4-logo-container">
                        <i class="fa-solid fa-user-plus"></i>
                    </div>
                    <h3>Start learning</h3>
                    <p className="small-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                     Accusantium 
                    </p>
                      
                    </div>


                </div>
            </div>

            <div className="row2">
                <div className="heading-text-container">
                    <h2>Course <span className='highlight-text'>Categories</span></h2>
                </div>
                <div className="row2Inside">


                    {categories && categories.map((category)=>{
                        return (
                            <div className="row2-card">
                                <div className='row2-card-img-container'><img src={`http://localhost:3000/${category.categoryImage}`} alt="" /></div>
                                <p>{category.category}</p>
                                <p className="row2-card-desc">{category.description}</p>
                            <button className='row2-card-count-btns stylish-btns'>7 courses</button>
                            </div>
                        )
                    })}

                </div>
            </div>


        <div className="row3">
            <div className="row3Inside">
                <div className="row3InsideCol1">
                    <img src={student} alt="" />
                </div>
                <div className="row3InsideCol2">
                    <h3>We provide the best online <span className="highlight-text">teaching and learning</span></h3>
                    <p>We strive to provide the best online teaching and learning through interactive sessions and messaging among 
                        teachers and students which make the learning process more effective and enjoyable.
                    </p>
                    Our teachers provide the following:
                    <ul>
                        
                        <li>Online teaching</li>
                        <li>Online consultations</li>
                        <li>Online messaging</li>
                    </ul>

                    <div className="row3-btns-container">
                    <button className="row3InsideCol2-btns stylish-btns">Online teaching</button>
                    <button className="row3InsideCol2-btns stylish-btns">Online consultations</button>
                    <button className="row3InsideCol2-btns stylish-btns">Online messaging</button>
                    </div>

                    <button onClick={getStarted} className="stylish-btns1">Get started now</button>

                </div>
            </div>
        </div>

        <UniversityAnnouncement />

        </div>
    )
}

export default Home