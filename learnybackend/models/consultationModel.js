const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    count: {
        type: String,

    },
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    pendingStudents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    meetLink: {
        type: String,

    }
}, {timestamps: true})

module.exports = mongoose.model('Consultation',consultationSchema)