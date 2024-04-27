import { useEffect, useRef, useState } from 'react'
import './css/courseContentForm.css'

import {toast} from 'react-hot-toast'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

import JoditEditor from 'jodit-react'

const LectureForm = ()=>{

    const location = useLocation()
    const params = useParams()

    const id = params.id
    const navigate = useNavigate()

    const [title, setTitle] = useState('')

    const [lectureNumber, setLectureNumber] = useState()

    const [content, setContent] = useState('')

    const editor = useRef(null)

    const [videoUrl, setVideoUrl] = useState('')



    const specialData = location.state

    console.log(specialData)
    
    const submitForm = async (e)=>{
        e.preventDefault()

        if (!title){
            toast.error('Fill the title field')
        }
        else {
            if (specialData[0] == 'Create'){
                const response = await fetch('/api/lecture',{
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        lectureNumber: lectureNumber,
                        content: content,
                        videoUrl: videoUrl,
                        courseContentId: id
                        
                    })
                })
                if (response.ok){
                    toast.success('Lecture has been added')
                    navigate('/teacher-courses-dashboard')
                    
                }
                else {
                    toast.error('Something went wrong')
                }
            }
            if (specialData[0] == 'Update'){
                const response = await fetch(`/api/lecture/${specialData[1]._id}`,{
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        lectureNumber: lectureNumber,
                        content: content,
                        videoUrl: videoUrl,
                        courseContentId: id
                    })
                })
                if (response.ok){
                    toast.success('Lecture has been Updated')
                    navigate('/teacher-courses-dashboard')
                    
                }
                else {
                    toast.error('Something went wrong')
                }
            }
        }
    }

    useEffect(()=>{
        if (specialData[0] == 'Update') {
            setTitle(specialData[1].title)
            setLectureNumber(specialData[1].lectureNumber)
            setContent(specialData[1].content)
            setVideoUrl(specialData[1].videoUrl)
        }
    },[])

    

    return (
        <div className="update-category-container">
            <h3>{specialData[0]} a Lecture</h3>
            <form action="">
                <label htmlFor="title">Course Title</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" />

                <label htmlFor="lectureNumber">Lecture no.</label>
                <input value={lectureNumber} onChange={(e)=>setLectureNumber(e.target.value)} type="number" name='lectureNumber' />

                <label htmlFor="content">Content</label>
                <JoditEditor 
                    ref={editor}
                    value={content}
                    onChange={newContent=>setContent(newContent)}
                />

                <label htmlFor="videoUrl">Video Url</label>
                <input value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)} type="text" name='videoUrl'/>

                <button onClick={submitForm} className="create-btn stylish-btns">{specialData[0]} Lecture</button>
            </form>
        </div>
    )
}

export default LectureForm