import { useEffect, useState } from "react"
import './css/adminUniversityAnnouncement.css'

import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const UniversityAnnouncementPage = ()=>{

    const [announcements, setAnnouncements] = useState([])

    const navigate = useNavigate()
    const FetchData = async ()=>{
        const response = await fetch('/api/announcement/university')

        if(response.ok){
            const data = await response.json()
            setAnnouncements(data)
        }
    }


    const submitDeleteRequest = async (id)=>{

        const response = await fetch(`/api/announcement/university/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.ok){
            toast.success('Announcement deleted successfully')
            window.location.reload()
        }
        else {
            
            // window.location.reload()
            const data = await response.json()

            console.log(data)

            toast.error(data.error)
        }

    }
    
    const goToUpdatePage = (announcement)=>{
        navigate('/admin-announcement-form',{state: ['Update', announcement]})
    }
    const goToCreatePage = ()=>{
        navigate('/admin-announcement-form',{state: ['Create']})
    }
    useEffect(()=>{
        FetchData()
    },[])


    const showDeletePrompt = (index)=>{
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'flex'
    }

    const hideDeletePrompt = (index)=>{
        document.querySelectorAll('.deletePromptContainer')[index].style.display = 'none'
    }

    return (
        <div className="university-announcement-page">
            <h3>Manage University Announcement</h3>
            {announcements && announcements.map((announcement, index)=>{
                return (
                <div className="university-announcement-card">

                    <div className="deletePromptContainer">
                        <h2>Are you sure to delete this announcement ?</h2>
                        <div>
                            <button onClick={()=>submitDeleteRequest(announcement._id)} className="yes">Yes</button>
                            <button onClick={()=>hideDeletePrompt(index)} className="no">No</button>
                        </div>
                    </div>
                    
                    <h3>{announcement.title}</h3>
                    <p>{announcement.date}</p>
                    <p>{announcement.expiryDate}</p>
                    <div className="buttons-container">
                        <button onClick={()=>goToUpdatePage(announcement)} className="category-btns category-edit">Edit</button>
                        <button onClick={()=>showDeletePrompt(index)} className="category-btns category-delete">Delete</button>
                    </div>
                </div>
                )
            })}

            <button onClick={goToCreatePage} className="create-btn stylish-btns">Create an Announcement</button>
        </div>
    )
}

export default UniversityAnnouncementPage