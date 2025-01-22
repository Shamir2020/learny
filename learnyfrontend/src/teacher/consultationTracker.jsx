import { useEffect, useState } from 'react'
import './css/consultationTracker.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
const ConsultationTracker = () => {
    const navigate = useNavigate()

    const goToConsultationForm = () => {
        navigate('/teacher-consultation-form')
    }

    const [consultaions, setConsultations] = useState([])

    const token = localStorage.getItem('token')

    const decoded = jwtDecode(token)

    const userId = decoded.id

    const FetchConsultations = async () => {
        const response = await fetch(`/api/consultation/${userId}`)

        if (response.ok) {
            const data = await response.json()
            setConsultations(data)
        }
    }

    useEffect(() => {
        FetchConsultations()
    }, [])
    return (
        <div className="learny-container">
            <Navbar />
            <div className="consultation-page-container">
            <h3>Consultation tracker page</h3>

            {consultaions && consultaions.map((consultation) => {
                return (
                    <div className="consultation-card">
                        <h3>Consultation slot - {consultation.count}</h3>
                        <p>{consultation.day} {consultation.startTime} - {consultation.endTime}</p>
                        <div className="btns-container">
                            <button className="category-btns">View</button>
                            <button className="category-btns">Edit</button>
                            <button className="category-btns">Delete</button>
                        </div>
                    </div>
                )
            })}
            
            <button onClick={() => goToConsultationForm()} className="stylish-btns create-btn">Create Consultation</button>

        </div>
        <Footer />
        </div>
    )
}


export default ConsultationTracker