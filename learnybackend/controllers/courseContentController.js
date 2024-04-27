const mongoose  = require('mongoose')
const CourseContent = require('../models/courseContent')
const Course = require('../models/courseModel')
const CreateCourseContent = async (req, res)=>{

    const courseContent = await CourseContent.create({
        title: req.body.title,
        course: req.body.courseId
    })

    res.status(200).json(courseContent)

}

const UpdateCourseContent = async (req, res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.body.id)){
        return res.status(400).json({error:'Invalid ID'})
    }
    const courseContent = await CourseContent.findByIdAndUpdate({_id:req.body.id},{
        title: req.body.title,
        course: req.body.courseId
    })
    if (!courseContent){
        return res.status(400).json({error: 'Course content could not be updated'})
    }
    res.status(200).json(courseContent)
}


const getCourseContents = async (req, res)=>{

        const id = req.params.id

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:'Invalid Course ID'})
        }

        const courseContents = await CourseContent.find({course:id}).populate('lectures')

        res.status(200).json(courseContents)
    }


const DeleteCourseContent = async (req, res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid Course ID'})
    }


    const courseContent = await CourseContent.findByIdAndDelete(id)


    if (!courseContent){
        return res.status(400).json({error: 'Course content could not be deleted'})
    }
    res.status(200).json(courseContent)

}

module.exports = {
    CreateCourseContent,
    getCourseContents,
    UpdateCourseContent,
    DeleteCourseContent
}