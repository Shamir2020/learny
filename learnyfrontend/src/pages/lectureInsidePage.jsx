import { useEffect, useState } from 'react'
import './css/lectureInsidePage.css'

import {useParams, useNavigate} from 'react-router-dom'

const LectureInsidePage = ()=>{
    
    const params = useParams()

    const id = params.id

    const [title, setTitle] = useState('')

    const [lectureNumber, setLectureNumber] = useState()

    const [content, setContent] = useState({__html:''})

    const [videoUrl, setVideoUrl] = useState({__html: ''})

    const FetchLecture = async ()=>{
        const response = await fetch(`/api/lecture/${id}`)

        if (response.ok){
            const data = await response.json()
            setTitle(data.title)
            setLectureNumber(data.lectureNumber)
            setContent({__html:data.content})
            setVideoUrl({__html: data.videoUrl})
        }
    }

    useEffect(()=>{
        FetchLecture()
    },[])


    return (
        <div className="lecture-inside-page-container">
            
            <h3>{title} {lectureNumber}</h3>
            <div className='lectureVideo' dangerouslySetInnerHTML={videoUrl} />
            <div dangerouslySetInnerHTML={content}></div>
        </div>
    )
}

export default LectureInsidePage