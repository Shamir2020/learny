import toast from "react-hot-toast"

const { useState, useEffect } = require("react")


const DepartmentCatelog = ()=>{

    const [departments, setDepartments] = useState([])


    const FetchDepartments = async ()=>{
        const response = await fetch('/api/department')
        if (response.ok){
            const data = await response.json()

            setDepartments(data)

            console.log(data)
        }
        else {
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        FetchDepartments()
    },[])

    return (
        <div className="admin-course-category-page-container">
            <h3>Departments</h3>

            

            {departments && departments.map(function (department, index){
                const desc = {__html:department.description}
                return (
                    <div className="admin-department-card">

                    <div className="department-card-col1">
                        <img src={`http://localhost:3000/${department.departmentPic}`} alt="error" />
                    </div>
                    <div className="department-card-col2">
                        <h4>{department.title}</h4>
                        <div dangerouslySetInnerHTML={desc}></div>

                    </div>
                    </div>
                )
            })}


        
        </div>
    )
}

export default DepartmentCatelog