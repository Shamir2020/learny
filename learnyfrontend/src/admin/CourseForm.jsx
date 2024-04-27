import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import './css/courseForm.css'
import { useNavigate, useLocation } from "react-router-dom"
import {toast} from 'react-hot-toast'
import JoditEditor from 'jodit-react'

const CourseForm = ()=>{


    const editor = useRef(null)

    const location = useLocation()

    const courseData = location.state

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    const [ftitle, setFtitle] = useState('')
    const [fcourseCode, setFcourseCode] = useState('')
    const [fDescription, setFDescription] = useState('')
    const [fcategory, setFCategory] = useState('')
    const [fteachers, setFTeachers] = useState([])
    const [fstudents, setFStudents] = useState([])
    const [fImage, setFImage] = useState('')


    const UpdateTeachers = (e)=>{
        console.log(e.target.value)
        
        let updatedTeachers = [...fteachers, e.target.value]
        setFTeachers(updatedTeachers)
        console.log(fteachers)
    }
    const UpdateStudents = (e)=>{
        console.log(e.target.value)
        
        let updatedStudents = [...fstudents, e.target.value]
        setFStudents(updatedStudents)
        console.log(fstudents)
    }
    const submitForm = async (e)=> {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('title',ftitle)
        formData.append('courseCode',fcourseCode)
        formData.append('description',fDescription)
        formData.append('category',fcategory)
        formData.append('teachers',fteachers)
        formData.append('students',fstudents)
        formData.append('courseImage',fImage)

        if (courseData[0] == 'Create'){
            axios.post('/api/course',formData, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>{
                if (res.status == 200){
                    navigate('/admin-course-page')
                    toast.success('Course added successfully')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else if (courseData[0] == 'Update'){
            const id = courseData[1]._id

            console.log(`Teachers - ${fteachers}`)

            axios.post(`/api/course/${id}`,formData, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res=>{
                if (res.status == 200){
                    navigate('/admin-course-page')
                    toast.success('Course updated successfully')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        

    }

    const FetchCategories = async ()=> {
        const response = await fetch('/api/category')

        if (response.ok){
            const data = await response.json()
            setCategories(data)
        }
    }

    const FetchTeachers = async ()=> {
        const response = await fetch('/api/admin/teacher', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }    
        )

        if (response.ok){
            const data = await response.json()
            setTeachers(data)
        }
    }

    const FetchStudents = async ()=> {
        const response = await fetch('/api/admin/student',{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.ok){
            const data = await response.json()
            setStudents(data)
        }
    }


    useEffect(()=>{
        FetchCategories()
        FetchTeachers()
        FetchStudents()
        if (courseData[0] == 'Update'){
           
            setFtitle(courseData[1].title)
            setFcourseCode(courseData[1].courseCode)
            setFDescription(courseData[1].description)
            setFCategory(courseData[1].category)
            setFTeachers(courseData[1].teachers)
            setFStudents(courseData[1].students)
        }
        
    },[])

    return (
        <div className="course-form-container">
            <h3>{courseData[0]} course</h3>
            <form action="">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" value={ftitle} onChange={(e)=>setFtitle(e.target.value)}/>

                <label htmlFor="courseCode">Course Code</label>
                <input type="text" name="courseCode" value={fcourseCode} onChange={(e)=>setFcourseCode(e.target.value)}/>

                <label htmlFor="description">Description</label>
                <JoditEditor 
                    ref={editor}
                    value={fDescription}
                    onChange={newContent=>setFDescription(newContent)}
                />

                <label htmlFor="category">Category</label>
                <select name="category" id="" value={fcategory} onChange={(e)=>setFCategory(e.target.value)}>
                    <option value="">select category</option>
                    {categories && categories.map((category)=>{
                        return (
                            <option value={category._id}>{category.category}</option>
                        )
                    })}
                </select>

                <label htmlFor="teachers">Teachers</label>
                <select multiple name="teachers" id=""  onChange={(e)=>UpdateTeachers(e)}>

                    {teachers && teachers.map((teacher)=>{
                        return (
                            <option value={teacher._id}>{teacher.username} - {teacher.name}</option>
                        )
                    })}

                </select>

                <label htmlFor="students">Students</label>
                <select multiple name="students" id=""  onChange={(e)=>UpdateStudents(e)}>

                    {students && students.map((student)=>{
                        return (
                            <option value={student._id}>{student.username} - {student.name}</option>
                        )
                    })}

                </select>

                <label htmlFor="courseImage">Image</label>
                <input type="file" name="courseImage" onChange={(e)=>setFImage(e.target.files[0])}/>

                <button onClick={submitForm} className="create-btn stylish-btns1">{courseData[0]} Course</button>

            </form>
        </div>
    )
}


export default CourseForm