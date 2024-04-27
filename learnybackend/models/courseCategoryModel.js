const mongoose = require('mongoose')

const CourseCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
       
    },
    description: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String
    },
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})

module.exports = mongoose.model('category',CourseCategorySchema)

