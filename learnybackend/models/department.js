const mongoose = require('mongoose')


const departmentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    departmentPic: {
        type: String
    },
    teachers: [{type: mongoose.Schema.Types.ObjectId}]
})


module.exports = mongoose.model('Department', departmentSchema)