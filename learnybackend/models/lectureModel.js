const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lectureNumber:{
        type: Number,
        required: true
    },
    content: {
        type: String,
        
    },
    videoUrl: {
        type: String
    },
    courseContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseContent',
        required: true
    }
})


module.exports = mongoose.model('Lecture',lectureSchema)