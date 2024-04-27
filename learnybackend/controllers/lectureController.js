const Lecture = require('../models/lectureModel')
const CourseContent = require('../models/courseContent')
const mongoose = require('mongoose')


const CreateALecture = async (req , res)=>{

    if (!mongoose.Types.ObjectId.isValid(req.body.courseContentId)){
        return res.status(400).json({error:'Invalid course content ID'})
    }

    const lecture = await Lecture.create({
        title: req.body.title,
        lectureNumber: req.body.lectureNumber,
        content: req.body.content,
        videoUrl: req.body.videoUrl,
        courseContent: req.body.courseContentId

    })

    const courseContent = await CourseContent.findById(req.body.courseContentId)
 
    console.log(!courseContent.lectures.includes(lecture.id))
    if (!courseContent.lectures.includes(lecture.id)){
        courseContent.lectures.push(lecture.id)
    }

    await courseContent.save()

    res.status(200).json(lecture)

}


const UpdateLecture = async (req, res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.body.courseContentId) || !mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error: 'Invalid ID'})
    }
    const lecture = await Lecture.findByIdAndUpdate({_id: req.params.id},{
        title: req.body.title,
        lectureNumber: req.body.lectureNumber,
        content: req.body.content,
        videoUrl: req.body.videoUrl,
        courseContent: req.body.courseContentId 
    })

    res.status(200).json(lecture)

}


const GetALecture = async (req, res)=>{
    const id = req.params.id 
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid Lecture ID'})
    }

    const lecture = await Lecture.findById(id)

    if (!lecture){
        return res.status(400).json({error:'Lecture was not found'})
    }
    res.status(200).json(lecture)

}

module.exports = {
    CreateALecture,
    UpdateLecture,
    GetALecture
}