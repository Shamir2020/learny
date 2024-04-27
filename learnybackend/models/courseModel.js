const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    courseImage: {
        type: String,
    },
    teachers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    enrollRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = mongoose.model('Course',CourseSchema)