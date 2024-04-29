import { useEffect } from 'react'
import './css/adminDashboard.css'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {jwtDecode} from 'jwt-decode'

const AdminDashboard = ()=> {

    const navigate = useNavigate()
    
    const token = localStorage.getItem('token')

    console.log(token)

    

    if (token) {
        const decoded = jwtDecode(token)
        const role = decoded.role
        if (role == 'admin'){
            return (
                <div className="admin-dashboard-container">
                    <h3>Admin Dashboard</h3>
                    <ol>
                        <Link to='/admin-course-page'><li>Go to Course Page</li></Link>
                        <Link to='/admin-category-page'><li>Go to Category Page</li></Link>
                        <Link to='/admin-teacher-page'><li>Go to Teacher Page</li></Link>
                        <Link to='/admin-student-page'><li>Go to Student Page</li></Link>
                        <Link to='/admin-announcement-page'><li>Go to Announcement Page</li></Link>
                        <Link to='/admin-department-page'><li>Go to Department Page</li></Link>
                    </ol>
                </div>
            )
        }
        else {
            return (
                <div className="admin-dashboard-container">
                    <h2>You are not authorized to view this page</h2>
                </div>
            )
        }
    }
    else {
        return (
            <div className="admin-dashboard-container">
                <h2>You are not authorized to view this page</h2>
            </div>
        )
    }
}

export default AdminDashboard