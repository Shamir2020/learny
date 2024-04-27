const mongoose = require('mongoose')

const coursAnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        required: true 
    },
    expiryDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
}) 


module.exports = mongoose.model('CourseAnnouncement', coursAnnouncementSchema)