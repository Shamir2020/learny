const mongoose = require('mongoose')


const courseContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture'
    }],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
})

module.exports = mongoose.model('CourseContent',courseContentSchema)