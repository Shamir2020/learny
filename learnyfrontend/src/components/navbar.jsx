import {Link} from 'react-router-dom'
import './css/navbar.css'
import Profile from './profile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ()=>{

    const navigate = useNavigate()

    const toggleClassName = ()=>{
        document.querySelector('.navbar').classList.toggle('sticky', window.scrollY > 0)
    }
    window.addEventListener('scroll', toggleClassName)


    const [search, setSearch] = useState('')

    const submitForm = async (e)=>{
        e.preventDefault()

        navigate(`/search-page/${search}`)
        setSearch('')
    }

    return (

        
        <div>
            <div className="header">
                <div className="headerInside">
                <Link to='/'><h2>Learny</h2></Link><h3>Learn with excellence</h3>
                <form action="" onSubmit={submitForm}>
                    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder='Search anything'/>
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                </div>
            </div>
        <div className="navbar">
            
            <div className="navbarInside">
                <ol>
                    {/* <Link to='/'><li>Home</li></Link> */}
                    <Link to='/course-catelog'><li>Courses</li></Link>
                    <Link to='/teacher-catelog'><li>Teachers</li></Link>
                    <Link to=''><li>Departments</li></Link>
                    <Link to='/about-us'><li>About Us</li></Link>
                    {/* <Link to='/upload-test-image'>Test</Link> */}
                    <Profile />
                </ol>
            </div>
        </div>
        </div>
    )
}

export default Navbar