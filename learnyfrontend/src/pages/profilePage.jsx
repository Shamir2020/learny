
import { useEffect } from 'react'
import './css/profilePage.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
const ProfilePage = ()=>{

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [profile, setProfile] = useState({})

    useEffect(()=>{
        const LoadProfile = async ()=>{
            const response = await fetch('/api/profile',{
                headers: {authorization: `Bearer ${token}`}
            })

            if (response.ok){
                const p = await response.json()
                setProfile(p.profile)

                console.log(p.profile.education)
                
            }
        }
        LoadProfile()
    },[])

    if (token){
        return (
            <>
            <Navbar />

            <div className="learny-container">
            <div className="profile-page">
                <div className="imageContainer">
                        <img src={`http://localhost:3000/${profile.profilePic}`} alt="error" />
                        
                    </div>
                <div className="profile-page-container">
                    
                    <div className="profile-page-container-col1 profile-page-container-cols">
                    <h3>Profile Information</h3>
                    <p>Name - <span className="red-text">{profile.name}</span></p>
                    <p>Education - <span className="red-text">{profile.education}</span></p>
                    <p>Language - <span className="red-text">{profile.language}</span></p>
                    <p>Location - <span className="red-text">{profile.location}</span></p>
                    <p>Phone - <span className="red-text">{profile.phone}</span></p>
                    </div>
                    <div className="profile-page-container-col2 profile-page-container-cols">
                    <h3>Socials links</h3>
                    <p>Facebook - <Link to={profile.facebook}><span className="red-text">Go to facebook</span></Link></p>
                    <p>Instagram - <Link to={profile.instagram}><span className="red-text">Go to instagram</span></Link></p>
                    <p>Linkedin - <Link to={profile.linkedin}><span className="red-text">Go to Linkedin</span></Link></p>
                    <p>Github - <Link to={profile.github}><span className="red-text">Go to github</span></Link></p>
                    </div>
                </div>
                <Link to='/update-profile'><button className='update-profile-btn1'>Update Profile</button></Link>
            </div>
            </div>
            <Footer />
            </>
        )
    }
    else {
        navigate('/')
    }
}

export default ProfilePage