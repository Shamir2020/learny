
const mongoose = require('mongoose')

const Profile = require('../models/profileModel')

const User = require('../models/userModel')
const getProfile = async (req, res)=>{
    const userId = req.user.id 

    const profile = await Profile.findOne({userId:userId})

    res.status(200).json({profile:profile})
}

const updateProfile = async (req, res) => {

    var profile

    if (req.file){
        profile = await Profile.findOneAndUpdate({userId: req.user._id},{
            name: req.body.name,
            education: req.body.education,
            language: req.body.language,
            location: req.body.location,
            phone: req.body.phone,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            github: req.body.github,
            profilePic: req.file.path
        })
    }
    else {
        profile = await Profile.findOneAndUpdate({userId: req.user._id},{
            name: req.body.name,
            education: req.body.education,
            language: req.body.language,
            location: req.body.location,
            phone: req.body.phone,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            github: req.body.github,
        })
    }

    await profile.save()
    var profile = await Profile.findOne({userId:req.user.id})

    const user = await User.findByIdAndUpdate({_id:req.user._id},{profile: profile._id})

    console.log('Profile Updated')
    res.status(200).json(profile)
}

module.exports = {
    getProfile,
    updateProfile
}