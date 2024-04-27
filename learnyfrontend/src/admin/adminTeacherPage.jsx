import { useEffect, useState } from 'react'
import './css/adminCourseCategoryPage.css'

const AdminTeacherPage = ()=>{
    
    const [teachers, setTeachers] = useState([])
    const token = localStorage.getItem('token')
    useEffect(()=>{
        const FetchTeacherData = async ()=> {
            const response = await fetch('/api/admin/teacher',{
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            })
            if (response.ok){
                const data = await response.json()
                setTeachers(data)
                console.log(data)
            }
        }
        FetchTeacherData()
    },[])
    return (
        <div className="admin-teacher-container">
            <h3>Admin - Teacher page</h3>
                
                {teachers && teachers.map(function(teacher){
                    return (
                        <div className="admin-course-category-card">
                    <h4>Username - {teacher.username}</h4>
                    <p>Name - {teacher.name}</p>
                    <p>Email - {teacher.email}</p>
                    <p>Created At - {teacher.createdAt}</p>
                    <p>Updated At - {teacher.updatedAt}</p>
                    <p>Role - {teacher.role}</p>
                    <div className="category-btns-container">
                        <button className="category-edit category-btns">Edit</button>
                        <button className="category-delete category-btns">Delete</button>
                    </div>
                    </div>
                    )
                })}
        </div>
    )
}

export default AdminTeacherPage