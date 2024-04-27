import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'


const ConsultationPage = () => {

    const params = useParams()

    const id = params.id 

    const navigate = useNavigate()


    const [consultaions, setConsultations] = useState([])

    const FetchConsultations = async () => {
        const response = await fetch(`/api/consultation/${id}`)

        if (response.ok) {
            const data = await response.json()
            setConsultations(data)
        }
    }

    useEffect(() => {
        FetchConsultations()
    }, [])
    return (
        <div className="consultation-page-container">
            <h3>Consultation page</h3>

            {consultaions && consultaions.map((consultation) => {
                return (
                    <div className="consultation-card">
                        <h3>Consultation slot - {consultation.count}</h3>
                        <p>{consultation.day} {consultation.startTime} - {consultation.endTime}</p>
                        <div className="btns-container">
                            <button className="category-btns stylish-btns">Book slot</button>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}


export default ConsultationPage