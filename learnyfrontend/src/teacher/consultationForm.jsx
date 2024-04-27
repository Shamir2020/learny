import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
const ConsultationForm = ()=>{

    const navigate = useNavigate()
    const [count, setCount ] = useState('')
    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [meetLink, setMeetLink] = useState('')

    const token = localStorage.getItem('token')

    const decoded = jwtDecode(token)

    const userId = decoded.id

    const submitForm = async (e)=>{
        e.preventDefault()

        console.log(startTime, endTime)
        
        const response = await fetch(`/api/consultation`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher: userId,
                count: count,
                day: day,
                startTime: startTime,
                endTime: endTime,
                meetLink: meetLink
            })
        })
        if (response.ok){
            toast.success('Consultation slot has been created')
            navigate('/teacher-courses-consultaions')
        }
        else {
            const data = await response.json()
            toast.error(data.error)
        }
    }

    return (
        <div className="course-form-container">
            <h3>Create consultaion</h3>
            <form action="">
                <label htmlFor="count">Consultation no.</label>
                <input value={count} onChange={(e)=>setCount(e.target.value)} type="text" name="count" />

                <label htmlFor="schedule">Consultation slot day</label>
                <select value={day} onChange={(e)=>setDay(e.target.value)} name="day" id="">
                    <option value="">Select day</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                </select>

                <label  htmlFor="time">Start Time</label>
                <input value={startTime} onChange={(e)=>setStartTime(e.target.value)} type="time" name="time"/>

                <label  htmlFor="time">End Time</label>
                <input value={endTime} onChange={(e)=>setEndTime(e.target.value)} type="time" name="time"/>
                
                <label  htmlFor="meetLink">Meet Link</label>
                <input value={meetLink} onChange={(e)=>setMeetLink(e.target.value)} type="text" name="meetLink" />

                <button onClick={(e)=>submitForm(e)} className="create-btn stylish-btns">Create</button>
            </form>
        </div>
    )
}

export default ConsultationForm