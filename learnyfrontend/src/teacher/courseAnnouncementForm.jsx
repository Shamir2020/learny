import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import JoditEditor from 'jodit-react'

const CourseAnnouncementForm = ()=>{

    const editor = useRef(null)

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [description, setDescription] = useState('')


    const params = useParams()
    const id = params.id

    const navigate = useNavigate()

    const location = useLocation()

    const announcementData = location.state

    useEffect(()=>{
        if (announcementData[0] == 'Update'){
            setTitle(announcementData[1].title)
            setDate(announcementData[1].date)
            setExpiryDate(announcementData[1].expiryDate)
            setDescription(announcementData[1].description)
        }
    },[])

    const submitForm = async (e)=>{
        e.preventDefault()
        
        var response

        if (announcementData[0] == 'Create'){
            response = await fetch(`/api/announcement/course`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title,
                    date: date,
                    expiryDate: expiryDate,
                    description: description,
                    course: id
                })
            })
        }
        if (announcementData[0] == 'Update'){
            response = await fetch(`/api/announcement/course/${announcementData[1]._id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title,
                    date: date,
                    expiryDate: expiryDate,
                    description: description,
                    course: id
                })
            })
        }

        if (response.ok){
            toast.success(`Announcement ${announcementData[0]}d successfully`)
            navigate(`/course-announcement-page/${id}`)
        }
        else {
            toast.error(`Announcement could not be ${announcementData[0]}d`)
        }
    }

    return (
        <div className="university-announcement-form-container course-form-container">
            <form action="">
                <h3>{announcementData[0]} Announcement</h3>
                
                <label htmlFor="title">Announcement Title</label>
                <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="write title" required/>
                
                <label htmlFor="date">Announcement Date</label>
                <input type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)} required/>

                <label htmlFor="expiryDate">Expiration Date</label>
                <input type="date" name="expiryDate" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} required/>

                <label htmlFor="description">Description</label>
                <JoditEditor ref={editor} value={description} onChange={newContent=>setDescription(newContent)} />
d
                <button onClick={submitForm} className="create-btn stylish-btns">{announcementData[0]} Announcement</button>
            </form>
        </div>
    )
}

export default CourseAnnouncementForm