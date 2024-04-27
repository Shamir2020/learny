const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requried: true
    } ,
    name: {
        type: String
    },
    bio:{
        type: String
    },
    education: {
        type: String
    },
    language: {
        type: String
    },
    location:{
        type: String
    },
    facebook:{
        type: String
    },
    instagram:{
        type: String
    },
    linkedin:{
        type: String
    },
    github:{
        type: String
    },
    phone: {
        type: String
    },
    profilePic: {
        type: String
    }

},{timestamps:true})

module.exports = mongoose.model('Profile',ProfileSchema)

