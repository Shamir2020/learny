import { useState } from "react"
import {Link} from 'react-router-dom'
import './css/userTypeSelection.css'
const UserTypeSelection = ()=> {
    
    return (
        <div className="user-type-selection-container">
            <h2>What kind of user are you?</h2>
            <form action="">
                
                <div className="user-type-selection-col1">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptate pariatur tempore debitis perspiciatis excepturi quod illum autem recusandae repudiandae harum at id quidem, est reprehenderit deserunt dolores animi dolor!</p>
                <Link to={`/register/student`}><button>I am a student</button></Link>
                </div>
                <div className="user-type-selection-col2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor repudiandae quisquam ratione deserunt sit, facilis officiis consequatur vero voluptatum asperiores vel, corrupti placeat dolorem iste eius, aspernatur laudantium dignissimos! Nam.</p>
                <Link to={`/register/teacher`}><button>I am a teacher</button></Link>
                </div>
            </form>
        </div>
    )
}

export default UserTypeSelection