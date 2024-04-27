const User = require('../models/userModel')
const Profile = require('../models/profileModel')


const getCatelogTeachers = async (req, res)=> {

    const teachers = await User.find({role:'teacher'}).populate('profile')

    res.status(200).json(teachers)

}


module.exports = {
    getCatelogTeachers
}