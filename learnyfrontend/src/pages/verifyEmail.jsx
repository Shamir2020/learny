import { useEffect, useState } from "react"

import {Link, useParams} from 'react-router-dom'
import successful from '../images/successful.png'

import './css/verifyEmail.css'
import Navbar from "../components/navbar"
import Footer from "../components/footer"

const VerifyEmail = ()=>{
    
    const [validLink, setValidLink] = useState(false)
    const param = useParams()

    useEffect(()=>{
        const VerifyEmailReq = async () => {
            try{
                const url = `/api/user/${param.id}/verify/${param.token}`
                const response = await fetch(url)
                const data = await response.json()

                if (response.ok){
                    setValidLink(true)
                }
            }
            catch(error){
                console.log(error)
                setValidLink(false)
            }
        }
        VerifyEmailReq()
    },[])

    if (validLink){
        return (
            <>
            <Navbar />
            <div className="learny-container">
            <div className="verify-token-container">
                <div className="verify-token-container-Inside">
                    <img src={successful} alt="success_img" />
                    <p>Email has been verified</p>
                    <Link to='/login'><button>Go to Login</button></Link>
                </div>
            </div>
            </div>
            <Footer />
            </>
        )
    }
    else {
        return (
            <>
            <Navbar />
            <div className="learny-container">
            <div className="verify-token-container">
                <div className="verify-token-container-Inside">
                    <p>404 not found</p>
                    
                </div>
            </div>
            </div>
            <Footer />
            </>
        )
    }
}

export default VerifyEmail