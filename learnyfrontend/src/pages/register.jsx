import { useEffect, useState } from 'react'
import './css/login.css'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
const Register = ()=>{

    const {type} = useParams()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [userType, setUserType] = useState('')

    const [error, setError] = useState(null)

    const [msg, setMsg] = useState(null)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(()=>{
        console.log(type)
        if (!['student','teacher'].includes(type)){
            navigate('/')
            toast.error('Invalid usertype parameter')
        }
        
        setUserType(type)
    },[])

    const submitForm = async (e)=>{
        
        e.preventDefault()

        if (!name || !username || !email || !password1 || !password2){
            setError('Fill all the fields')
            toast.error('Fill all the fields')
        }
        else if (password1 != password2){
            setError('Passwords do not match')
            toast.error('Passwords do not match')
        }
        else {
            const response = await fetch('/api/user/register',{
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2,
                    role: userType
                })
            })
            
            const user = await response.json()
            if (response.ok) {
                
                
                setMsg('Email sent to you. Please verify')
                
                toast.success('Email sent to you. Please verify')
                
                // toast.success('Registration successful')

            }
            else {
                setError(user.error)
                toast.error(user.error)
                console.log(`Register error - ${user.error}`)
            }
        }
    }

    if (!token){
        return (
            <div className="auth-container register-container">
                <form action="">
                    <h3>{userType} register</h3>
    
                    <div className="mini-containers">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe"/>
                    </div>
    
                    <div className="mini-containers">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="john45" required/>
                    </div>
                    
                    <div className="mini-containers">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="john45@gmail.com"/>
                    </div>
    
                    <div className="mini-containers">
                        <label htmlFor="password1">Password</label>
                        <input type="password" name="password1" value={password1} onChange={(e)=>setPassword1(e.target.value)} placeholder="*******"/>
                    </div>
    
                    <div className="mini-containers">
                        <label htmlFor="password2">Re-type password</label>
                        <input type="password" name="password2" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="*******"/>
                    </div>
    
                    <p className='error-message'>{error && error}</p>
                    
    
                    <button className='stylish-btns' onClick={submitForm}>Register</button>
                    <p>Already have an account? <span><Link to='/login'>Login here</Link></span></p>
                    <p className='msg-message'>{msg && msg}</p>
                </form>
            </div>
        )
    }
    else {
        navigate('/')
    }
}

export default Register