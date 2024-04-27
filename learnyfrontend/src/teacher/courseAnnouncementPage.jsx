import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const CourseAnnouncementPage = ()=>{

    const [announcements, setAnnouncements] = useState([])

    const params = useParams()

    const id = params.id

    const navigate = useNavigate()
    const FetchData = async ()=>{
        const response = await fetch(`/api/announcement/course/${id}`)

        if(response.ok){
            const data = await response.json()
            setAnnouncements(data)
        }
    }


    const submitDeleteRequest = async (id)=>{

        const response = await fetch(`/api/announcement/course/${id}`,{
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
    
    const goToUpdatePage = (id, announcement)=>{
        navigate(`/course-announcement-form/${id}`,{state: ['Update', announcement]})
    }
    const goToCreatePage = (id)=>{
        navigate(`/course-announcement-form/${id}`,{state: ['Create']})
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
                        <button onClick={()=>goToUpdatePage(id, announcement)} className="category-btns category-edit">Edit</button>
                        <button onClick={()=>showDeletePrompt(index)} className="category-btns category-delete">Delete</button>
                    </div>
                </div>
                )
            })}

            <button onClick={()=>goToCreatePage(id)} className="create-btn stylish-btns">Create an Announcement</button>
        </div>
    )
}

export default CourseAnnouncementPage