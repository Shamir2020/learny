import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentDashboard from '../student/studentDashboard'
import './css/dashboardPage.css'
import { jwtDecode } from 'jwt-decode'
import TeacherDashboard from '../teacher/teacherDashboard'
import Navbar from '../components/navbar'
import Footer from '../components/footer'



const DashboardPage = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const [role, setRole] = useState('')

    useEffect(() => {
        const decode = jwtDecode(token)
        console.log(`Data - ${decode.role}`)
        setRole(decode.role)
        console.log(`Role - ${role}`)
    }, [])


    if (role == 'student') {
        return (
            <>
                <Navbar />
                <div className="learny-container">
                    <div className="dashboard-page-container">
                        <StudentDashboard />
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    else if (role == 'teacher') {
        return (
            <>
                <Navbar />
                <div className="learny-container">
                    <div className="dashboard-page-container">
                        <TeacherDashboard />
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    else if (role == 'admin') {
        navigate('/admin-dashboard')
    }
}

export default DashboardPage