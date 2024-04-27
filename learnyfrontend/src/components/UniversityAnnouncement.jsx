import { useEffect, useState } from 'react'
import './css/universityAnnouncement.css'

const UniversityAnnouncement = ()=>{

    const [announcements, setAnnouncements] = useState([])

    const FetchAnnouncements = async ()=>{
        const response = await fetch('/api/announcement/university')
        if (response.ok){
            const data = await response.json()
            setAnnouncements(data)
        }
    }


    useEffect(()=>{
        FetchAnnouncements()
    },[])

    const formatDate = (date)=> {
        
        const dater = new Date(date)
        const f = new Intl.DateTimeFormat("en-us", {
            dateStyle: 'long'
        })

        return f.format(dater)
    }
    
    return (
        <div className="university-announcement-component-conatainer">
            <h1>Announcement</h1>
            <div className="university-announcement-component-container-inside">
                

                {announcements && announcements.map((announcement)=>{
                    return (
                        <div className="announcement-card">
                            <h2>{announcement.title}</h2>
                            <p>{formatDate(announcement.date)}</p>
                        </div>
                    )
                })}
                
            </div>

            
        </div>
    )
}

export default UniversityAnnouncement