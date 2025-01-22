import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/userContext"
import {Link, useNavigate} from 'react-router-dom'
import { toast } from "react-hot-toast"
import './css/profile.css'
import { jwtDecode } from "jwt-decode"

const Profile = ()=>{
   

    const {user, setUser} = useContext(UserContext)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    var username 

    try {
        const decoded = jwtDecode(token)
        username = decoded.username
    } catch (error) {
        
    }

    const Logout = async ()=>{
        navigate('/')
        
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('auth')
        setUser(null)
        toast.success('Logout successful')

    }

    if (!token && !user) {
        return (
            <>
                <Link to='/login'><li>Sign In</li></Link>
                <Link to='/user-selection'><li>Sign Up</li></Link>
            </>
        )
    }
    else{
        return (
            <>
            <Link className="profile-link" to='/profile'><li><button className="stylish-btns1"><i className="fa-solid fa-user"></i>{username}</button>
            <ol className="nav-dropdown">
            <Link to='/dashboard'><li>Dashboard</li></Link>
            <Link to='/account'><li>Account</li></Link>
            <Link to='/profile'><li>Profile</li></Link>
            <Link to='/messenger-page/all'>Messenger</Link>
            </ol>
            </li></Link>
            <Link onClick={Logout}>Logout</Link>
            </>
        )
    }

    
}

export default Profile