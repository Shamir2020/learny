const Department = require('../models/department')




const CreateDepartment = async (req, res)=>{
    
    const department = await Department.create({
        title: req.body.title,
        description: req.body.description,
        departmentPic: req.file.path
    })

    if (!department){
        return res.status(400).json({error: 'Department could not be created'})
    }
    res.status(200).json(department)

}

const UpdateDepartment = async (req, res)=>{

    const id = req.params.id 

    const department = await  Department.findByIdAndUpdate({_id:id },{
        title: req.body.title,
        description: req.body.description,
        
    })

    if (!department){
        return res.status(400).json({error: 'Department could not be updated'})
    }
    res.status(200).json(department)

}

const DeleteDepartment = async (req, res)=>{
    const id = req.params.id 

    const department = await Department.findByIdAndDelete(id)

    if (!department){
        return res.status(400).json({error: 'Department could not be updated'})
    }
    res.status(200).json(department)
    
}

const GetDepartments = async (req, res)=>{
    const departments = await Department.find({})

    res.status(200).json(departments)
}

const GetADepartment = async (req, res)=>{
    const id = req.params.id 

    const department = await Department.findById(id)

    res.status(200).json(department)
}


module.exports = {
    CreateDepartment,
    UpdateDepartment,
    DeleteDepartment,
    GetADepartment,
    GetDepartments
}