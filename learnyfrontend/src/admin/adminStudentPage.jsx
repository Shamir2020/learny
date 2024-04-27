import { useEffect, useState } from "react"


const AdminStudentPage = ()=>{
    const [students, setStudents] = useState([])
    const token = localStorage.getItem('token')
    useEffect(()=>{
        
        const FetchStudentData = async ()=>{
            const response = await fetch('/api/admin/student',{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok){
                const data = await response.json()
                setStudents(data)
            }
        }
        FetchStudentData()
    },[])
    return (
        <div className="admin-teacher-container">
            <h3>Admin - Student page</h3>
                
                {students && students.map(function(student){
                    return (
                        <div className="admin-course-category-card">
                    <h4>Username - {student.username}</h4>
                    <p>Name - {student.name}</p>
                    <p>Email - {student.email}</p>
                    <p>Created At - {student.createdAt}</p>
                    <p>Updated At - {student.updatedAt}</p>
                    <p>Role - {student.role}</p>
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

export default AdminStudentPage