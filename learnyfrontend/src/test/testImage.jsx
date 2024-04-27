import { useState } from "react"

import axios from 'axios'

const TestImageUpload = ()=> {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')


    const submitForm = async (e)=> {
        e.preventDefault()
        console.log(title)
        console.log(image)

        var formData = new FormData()
        formData.append('title', title)
        formData.append('image', image)

        axios.post('/api/test/upload-image',formData)
        .then(res=>{
            console.log(res)
            console.log(res.data)
        })

    }

    return (
        <div className="test-image-container">
            <h3>Test Image Upload Page</h3>
            
            <form action="">
                <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])} />
                <button onClick={submitForm}>Submit</button>
            </form>
        </div>
    )
}

export default TestImageUpload