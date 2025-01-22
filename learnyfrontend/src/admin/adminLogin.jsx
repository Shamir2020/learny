import { useState, useContext, useEffect } from 'react'
import './css/adminLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-hot-toast'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const AdminLogin = () => {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])

    const SubmitForm = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            setError('Fill all the fields')
            toast.error('Fill all the fields!')

        }
        else {
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            }).catch((error) => {
                console.log(error)
            })
            if (response.ok) {
                setError(null)
                console.log(response)
                const data = await response.json()

                console.log(`Login data - ${data}`)

                setUser(data)
                localStorage.setItem('token', data.token)


                toast.success(`Login successful! Welcome ${data.username}`)
                window.location.reload()
                navigate('/admin-dashboard')
                console.log(localStorage.getItem('token'))


            }
            else {
                const msg = await response.json()
                if (msg.message == 'verify-email') {
                    setError('Check your email and please verify')
                    toast.error('Check your email and please verify')
                }

                if (msg.error) {
                    setError(msg.error)
                    toast.error(msg.error)
                }

            }

        }
    }

    return (
        <>
        <Navbar />
        <div className="admin-parent-container learny-container">
            <div className="admin-login-container">

                <form action="">
                    <h3>Admin Login here</h3>
                    <div className="mini-containers">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off' placeholder="admin" required />
                    </div>
                    <div className="mini-containers">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" />
                    </div>

                    <button className='stylish-btns' onClick={SubmitForm}>Login</button>

                    <p><span className='error-message'>{error && error}</span></p>
                </form>

            </div>
        </div>

        <Footer />
        </>
    )
}

export default AdminLogin