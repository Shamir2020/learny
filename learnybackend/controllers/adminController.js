const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const crypto = require('crypto')
const VerifyToken = require('../models/verifyToken')
const sendMail = require('../utils/sendMail')


const getAdmin = async (req, res)=>{

    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        username: req.userusername,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
    })

}

const LoginAdmin = async (req, res)=>{

    const {username, password} = req.body

    if (!username || !password){
        return res.status(400).json({error:'Fill all the fields'})
        
    }
    const user = await User.findOne({username: username})


    if (!user){
        return res.status(400).json({error:"Wrong username"})
    
    }
    

    if (user && await bcrypt.compare(password, user.password)){

        if (!user.verified){
            
            let token = await VerifyToken.findOne({userId: user._id})
            if (!token){
                token = await VerifyToken({
                    _id: user._id,
                    token: crypto.randomBytes(16).toString('hex')
                })
            }
            const url = `http://localhost:3000/users/${user._id}/verify/${token.token}`
            await sendMail(user.email, 'Verify your email', url)
            return res.status(400).json({message:'verify-email'})
        }

        return res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user)
        })
    }else {
        res.status(400).json({error:'Wrong password'})
    }

}

const generateToken = (user)=>{
    return jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn:'15d'})
}





// Manage Teacher API 

const getTeachers = async (req, res)=> {
    const teachers = await User.find({role: 'teacher'}).select('-password')

    res.status(200).json(teachers)
}


// Manage Teacher API


// Manage Students 

const getStudents = async (req, res) => {
    const students = await User.find({role:'student'})
    
    res.status(200).json(students)
}

// Manage Students




module.exports = {
    getAdmin,
    LoginAdmin,
    getTeachers,
    getStudents
}
