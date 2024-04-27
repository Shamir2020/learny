import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentDashboard from '../student/studentDashboard'
import './css/dashboardPage.css'
import { jwtDecode } from 'jwt-decode'
import TeacherDashboard from '../teacher/teacherDashboard'



const DashboardPage = ()=>{

    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const [role, setRole]= useState('')

    useEffect(()=>{
        const decode = jwtDecode(token)
        console.log(`Data - ${decode.role}`)
        setRole(decode.role)
        console.log(`Role - ${role}`)
    },[])
    

    if (role == 'student'){
        return (
            <div className="dashboard-page-container">
                <StudentDashboard />
            </div>
        )
    }
    else if (role == 'teacher'){
        return (
            <div className="dashboard-page-container">
                <TeacherDashboard />
            </div>
        )
    }
    else if (role == 'admin'){
        navigate('/admin-dashboard')
    }
}

export default DashboardPage