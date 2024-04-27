import { useState, useContext, useEffect  } from 'react'
import './css/login.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContext'

import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-hot-toast'



const Login = ()=>{
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const [error, setError] = useState('')

    const token = localStorage.getItem('token')

    const SubmitForm = async (e)=>{
        e.preventDefault()
        if (!username || !password){
            setError('Fill all the fields')
            toast.error('Fill all the fields!')
            
        }
        else {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON. stringify({username: username, password: password})
            }).catch((error)=>{
                console.log(error)
            })
            if (response.ok){
                setError(null)
                console.log(response)
                const data = await response.json()

                console.log(`Login data - ${data}`)

                setUser(data)
                localStorage.setItem('token', data.token)
                

                toast.success(`Login successful! Welcome ${data.username}`)
                navigate('/')
                console.log(localStorage.getItem('token'))

            
            }
            else {
                const msg = await response.json()
                if (msg.message == 'verify-email'){
                    setError('Check your email and please verify')
                    toast.error('Check your email and please verify')
                }
                
                if (msg.error){
                    setError(msg.error)
                    toast.error(msg.error)
                }
                
            }
            
        }
    }

    if (token){
        navigate('/')
    }
    else {
        return (
            <div className="auth-container login-container">
    
                <form action="">
                    <h3>Login here</h3>
                    <div className="mini-containers">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="john45" required/>
                    </div>
                    <div className="mini-containers">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="*******"/>
                    </div>
    
                    <p><Link to='/forgetpassword1'>Forgot password?</Link></p>
                    <button className='stylish-btns1' onClick={SubmitForm}>Login</button>
                    <p>Don't have an account? <span><Link to='/user-selection'>Create an account</Link></span></p>
                    <p><span className='error-message'>{error && error}</span></p>
                </form>
            </div>
        )
    }
}

export default Login