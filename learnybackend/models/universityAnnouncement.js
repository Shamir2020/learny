const mongoose = require('mongoose')

const UniversityAnnouncementSchema = new mongoose.Schema({
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
    }
}) 

module.exports = mongoose.model('UniversityAnnouncement',UniversityAnnouncementSchema)

