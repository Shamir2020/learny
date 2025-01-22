const mongoose = require('mongoose')
const UniversityAnnouncement = require('../models/universityAnnouncement')
const CourseAnnouncement = require('../models/courseAnnouncementModel')

const createUniversityAnnouncement = async(req, res)=>{
    

    if (!req.body.title || !req.body.date || !req.body.expiryDate){
        return res.status(404).json({error:'Fill up the fields'})
    }
    const announcement = await UniversityAnnouncement.create({
        title: req.body.title,
        date: req.body.date,
        expiryDate: req.body.expiryDate
    })

    if (!announcement){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.status(200).json(announcement)
}

const updateUniversityAnnouncement = async (req, res)=>{
    const id = req.params.id 

    if (!req.body.title || !req.body.date || !req.body.expiryDate){
        return res.status(404).json({error:'Fill up the fields'})
    }

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid ID'})
    }

    const announcement = await UniversityAnnouncement.findByIdAndUpdate({_id:id},{
        title: req.body.title,
        date: req.body.date,
        expiryDate: req.body.expiryDate
    })

    if (!announcement){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.status(200).json(announcement)
}

const getUniversityAnnouncements = async (req, res)=>{
    const announcements = await  UniversityAnnouncement.find({})

    res.status(200).json(announcements)
}

const deleteUniversityAnnouncement = async (req, res) => {
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid ID'})
    }

    const announcement = await UniversityAnnouncement.findByIdAndDelete(id)

    if (announcement){
        return res.status(200).json({msg: 'Announcement deleted successfully'})
    }
    else {
        return res.status(400).json({error:'Announcement could not be deleted'})
    }
}

// Course Announcement Controllers 

const CreateCourseAnnouncement = async (req, res)=>{
    if (!req.body.title || !req.body.date || !req.body.expiryDate || !req.body.description){
        return res.status(404).json({error:'Fill up the fields'})
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.course)){
        return res.status(400).json({error: 'Invalid course ID'})
    }
    const announcement = await CourseAnnouncement.create({
        title: req.body.title,
        date: req.body.date,
        expiryDate: req.body.expiryDate,
        description: req.body.description,
        course: req.body.course
    })

    if (!announcement){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.status(200).json(announcement)
}


const getCourseAnnouncements = async (req, res)=>{
    const id = req.params.id 

    const announcements = await CourseAnnouncement.find({course: id})

    res.status(200).json(announcements)

}


const UpdateCourseAnnouncement = async (req, res)=>{
    if (!req.body.title || !req.body.date || !req.body.expiryDate || !req.body.description){
        return res.status(404).json({error:'Fill up the fields'})
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.course)){
        return res.status(400).json({error: 'Invalid course ID'})
    }
    const announcement = await CourseAnnouncement.findByIdAndUpdate({_id:req.params.id},{
        title: req.body.title,
        date: req.body.date,
        expiryDate: req.body.expiryDate,
        description: req.body.description,
        course: req.body.course
    })

    if (!announcement){
        return res.status(400).json({error:'Something went wrong'})
    }
    res.status(200).json(announcement)
}


module.exports = {
    createUniversityAnnouncement,
    getUniversityAnnouncements,
    updateUniversityAnnouncement,
    deleteUniversityAnnouncement,
    CreateCourseAnnouncement, 
    getCourseAnnouncements,
    UpdateCourseAnnouncement
}


