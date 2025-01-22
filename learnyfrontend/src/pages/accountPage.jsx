import './css/accountPage.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const AccountPage = () => {

    const navigate = useNavigate()

    const [profile, setProfile] = useState({})
    const token = localStorage.getItem('token')

    const [user, setUser] = useState({})


    const showDeleteContainer = () => {
        document.getElementById('delete-account-container').style.display = 'flex'
    }
    const hideDeleteContainer = () => {
        document.getElementById('delete-account-container').style.display = 'none'
    }

    const deleteAccountRequest = async () => {
        console.log('Delete account request')

        const response = await fetch('/api/user/delete', {
            headers: { 'authorization': `Bearer ${token}` }
        })

        if (response.ok) {
            navigate('/')
            toast.success('Account has been permanently deleted')
            localStorage.removeItem('token')
            window.location.reload()

        }

    }

    useEffect(() => {


        const FetchUser = async () => {
            const response = await fetch(`api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "token": token })
            })


            if (response.ok) {
                const user = await response.json()

                console.log(`user  is here ${user}`)
                setUser(user)
            }
            else {
                console.log('Bad request')
                return null
            }
        }
        FetchUser()


        const LoadProfile = async () => {
            const response = await fetch('/api/profile', {
                headers: { authorization: `Bearer ${token}` }
            })

            if (response.ok) {
                const p = await response.json()
                setProfile(p.profile)

                console.log(p.profile.education)
            }
        }
        LoadProfile()
    }, [])
    return (
        <>
            <Navbar />
            <div className="learny-container">
                <div className="account-page-container">
                    <h3>Account Information - {user.name}</h3>
                    <div className="account-page-container-inside">
                        <div className="account-page-container-inside-cols account-page-container-inside-col1">
                            <h3>Account</h3>
                            <p>Name - <span className='red-text'>{user.name}</span></p>
                            <p>Username - <span className="red-text">{user.username}</span></p>
                            <p>Email - <span className="red-text">{user.email}</span></p>
                            <p>Account type - <span className="red-text">{user.role}</span></p>
                            <p>Created At - <span className="red-text">{user.createdAt}</span></p>

                            <button onClick={showDeleteContainer} className='delete-btn'>Delete Account</button>
                            <div id="delete-account-container">
                                <h3>Are you sure you want to delete account</h3>
                                <p>Account deletion is permanent. Once deleted you will lose all your account Information</p>
                                <div className='account-deletion-mini'><button onClick={hideDeleteContainer} className="no">No</button>
                                    <button onClick={deleteAccountRequest} className="yes">Yes</button></div>

                            </div>
                        </div>
                        <div className="account-page-container-inside-cols account-page-container-inside-col2">
                            <h3>Profile</h3>
                            <p>Name - <span className='red-text'>{profile.name}</span></p>
                            <p>Education - <span className="red-text">{profile.education}</span></p>
                            <p>Language - <span className="red-text">{profile.language}</span></p>
                            <p>Location - <span className="red-text">{profile.location}</span></p>
                            <p>Facebook - <Link to={profile.facebook}><span className="red-text">Go to facebook</span></Link></p>
                            <p>Instagram - <Link to={profile.instagram}><span className="red-text">Go to instagram</span></Link></p>
                            <p>Linkedin - <Link to={profile.linkedin}><span className="red-text">Go to Linkedin</span></Link></p>
                            <p>Github - <Link to={profile.github}><span className="red-text">Go to github</span></Link></p>
                            <Link to='/update-profile'><button className='update-btn'>Update Profile</button></Link>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AccountPage