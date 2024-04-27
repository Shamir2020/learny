import { useEffect, useState } from 'react'
import './css/teacherDashboard.css'
import {Link} from 'react-router-dom'

const TeacherDashboard = ()=> {

    
    return (
        <div className="admin-dashboard-container">
            <h3>You're teaching these courses</h3>
            
            <ol>
            <Link to='/teacher-courses-dashboard'><li>Go to Your courses</li></Link>
            <Link to='/teacher-courses-consultaions'><li>Go to Your Consulations tracker</li></Link>
            </ol>
            
            
        </div>
    )
}

export default TeacherDashboard