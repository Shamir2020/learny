import { useState } from 'react'
import './css/forgetPassword.css'

import {toast} from 'react-hot-toast'

import { useNavigate } from 'react-router-dom'

const ForgetPassword1 = ()=>{

    const navigate = useNavigate()

    const [email , setEmail] = useState('')
 
    const [error, setError] = useState('')

    const [msg, setMsg] = useState('')

    const SubmitForm = async (e)=>{
        e.preventDefault()
        if (!email){
            setError('Fill the email field')
        }
        else {
            const response = await fetch('/api/user/forgetpassword1',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({email: email})
            })

            if (response.ok){
                const data = await response.json()
                setMsg(data.message)
                toast.success(data.message)
                setError('')
                
            }
            else {
                const data = await response.json()
                setError(data.error)
                toast.error(data.error)
                setMsg('')
            }
        }

    }


    return (
        <div className="forget-password1-container">
            <form action="">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your email"/>
                <p>{error && error}</p>
                <button onClick={SubmitForm} className="submit-btn">Submit</button>
                <p>{msg && msg}</p>
            </form>
        </div>
    )
}

export default ForgetPassword1