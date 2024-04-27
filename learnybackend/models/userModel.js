const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ['admin','teacher','student'],
        default:'student'
    },
    status: {
        type: String,
        enum: ['approved','rejected','underReview'],
        default:'underReview'
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
}, {timestamps: true})

module.exports = mongoose.model('User',UserSchema)