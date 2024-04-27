import { useEffect, useState } from "react"
import {toast} from 'react-hot-toast'

import { useParams, useNavigate } from "react-router-dom"


import './css/changePassword.css'

const ChangePassword = ()=>{


    const params = useParams()

    const navigate = useNavigate()

    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')

    const [validLink , setValidLink] = useState(false)

    useEffect(()=>{
        const id = params.id 
        const token = params.token 

        const VerifyLink = async()=>{
            const response = await fetch(`/api/user/users/${id}/changepassword/${token}`)

            if (response.ok){
                setValidLink(true)
            }
            else {
                setValidLink(false)
            }
        }
        VerifyLink()

    },[])

    const SubmitForm = async (e) =>{
        e.preventDefault()
        if (!password1 || !password2){
            setError('Fill the passwords fields')
            toast.error('Fill the passwords fields')
        }
        else if (password1 != password2){
            setError('Passwords do not match')
            toast.error('Passwords do not match')
        }
        else {
            const id = params.id 
            const token = params.token

            const response = await fetch(`/api/user/users/${id}/changepassword/${token}`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({password:password1})
            })
            if (response.ok){
                toast.success('Password reset successful')
                navigate('/login')

            }
            else {
                setError('Something went wrong')
                toast.error('Something went wrong')
            }
        }
    }

    if (validLink){
        return (
            <div className="change-password-container">
                <form action="">
                    <div className="mini-containers">
                        <label htmlFor="password1">New Password</label>
                        <input type="password" name="password1" value={password1} onChange={(e)=>setPassword1(e.target.value)} placeholder="New Password"/>
                    </div>
                    <div className="mini-containers">
                        <label htmlFor="password1">Re-type Password</label>
                        <input type="password" name="password2" value={password2} onChange={(e)=>setPassword2(e.target.value)} placeholder="Re-type Password"/>
                    </div>
                    <button onClick={SubmitForm}>Confirm</button>
                </form>
            </div>
        )
    }
    else {
        <div className="change-password-container">
            <p>404 not found</p>
        </div>
    }
}



export default ChangePassword