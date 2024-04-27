const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const crypto = require('crypto')
const VerifyToken = require('../models/verifyToken')
const sendMail = require('../utils/sendMail')

const getUserData = asyncHandler(
    async (req, res)=>{

        const {token} = req.body
        try {
            const decoded = jwt.decode(token)

            const id = decoded.id

           

            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({error:"Invalid id"})
            }
            const user = await User.findById(id).select('-password')

            return res.status(200).json(user)

        } catch(error){
            console.log(error)
            return res.status(400).json({error:"Invalid token"})
        }

    }
)

const Login = asyncHandler(async (req, res)=>{
    const {username, password} = req.body

    if (!username || !password){
        return res.status(400).json({error:'Fill all the fields'})
        
    }
    const user = await User.findOne({username: username})


    if (!user){
        return res.status(400).json({error:"Wrong username"})
    
    }
    if (user.role == 'admin') {
        return res.status(400).json({error:"Not authorized to login as admin here"})
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

})

const Logout = async (req, res) =>{
    req.user = null

    res.status(200).json({msg:'Logout successful'})
}

const Register = asyncHandler(async (req, res)=>{
    const {name, username, email, userType, password1, password2, role} = req.body 
    if(await User.findOne({username})){
        return res.status(400).json({error:'Username already exists'})
        // throw new Error('Username already exists')
    }
    if (await User.findOne({email})){
        return res.status(400).json({error:'Email already exists'})
        // throw new Error('Email already exist')
    }
    if (password1 != password2){
        return res.status(400).json({error:'Passwords do not match'})
        // throw new Error('Passwords do not match')
    }
    if (!role || role == 'admin'){
        return res.status(400).json({error:"Invalid user role"})
    }

    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password1, salt)

    const user = await User.create({
        name: name,
        username: username,
        email: email,
        password: hashPassword,
        role: role

    })
    if (user){

        const token = await VerifyToken.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        })

        const url = `http://localhost:3000/users/${user._id}/verify/${token.token}`

        await sendMail(user.email, "Verify your email", url)

        const profile = await Profile.create({
            userId: user._id,
            name: user.name
        })

        user.profile = profile._id

        await user.save()

        res.status(200).json({message:"An email sent to you. Please verify your email"})
        
    }else{
        throw new Error('Invalid User data')
    }
})

const generateToken = (user)=>{
    return jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn:'15d'})
}

const verifyEmail = async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if (!user){
            return res.status(400).json({error:'Invalid link'})
        }
        const token = await VerifyToken.findOne({
            userId: user._id ,
            token: req.params.token
        })
        if (!token){
            return res.status(400).json({error:"Invalid link"})
        }
        console.log('Verifying user')
        await User.findByIdAndUpdate(user._id,{ verified: true})
        await VerifyToken.findByIdAndDelete(token._id)


        console.log('Verified user')
        res.status(200).json({message:'Email has successfully been verified'})
    }
    catch (error){
        res.status(400).json({error:'Invalid link'})
        console.log(error)
    }
}


const ForgetPassword1 = async(req, res)=>{
    const email = req.body.email
    
    const user = await User.findOne({email:email})

    if (!user){
        return res.status(400).json({error:'No account exists with this email'})
    }

    let token = await VerifyToken.findOne({userId: user._id})

    if (!token){
        token = await VerifyToken.create({
            userId: user.id,
            token: crypto.randomBytes(16).toString('hex')
        })
    }


    const url = `http://localhost:3000/users/${user._id}/changepassword/${token.token}`
    await sendMail(user.email,'click this link to change your password',url)

    res.status(200).json({message:'An email has been sent to you to change password'})

}
const forgetPassword2 = async (req, res) => {
    try {
        const id = req.params.id 
    let token = req.params.token 

    const user = await User.findById(id)
    if (!user){
        return res.status(400).json({error:'Invaild link'})
    }
    token = await VerifyToken.findOne({userId:user._id, token: token})
    
    if (!token){
        return res.status(400).json({error:'Invaild link'})
    }

    res.status(200).json({success:true})
    }
    catch(error){
        console.log(error)
    }
    
}

const forgetPassword3 = async (req, res)=>{
    const id = req.params.id 
    let token = req.params.token 


    const password = req.body.password

    const user = await User.findById(id)
    if (!user){
        return res.status(400).json({error:'Invaild link'})
    }
    console.log(user)
    token = await VerifyToken.findOne({userId:user._id, token: token})
    
    if (!token){
        return res.status(400).json({error:'Invaild link'})
    }

    console.log(token)
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    await User.findOneAndUpdate({_id: id}, {password: hashedpassword})

    await VerifyToken.findOneAndDelete({token:token})

    res.status(200).json({message:'Password reset successful !'})
}

const deleteAccount = async (req, res)=>{
    await User.findByIdAndDelete(req.user.id)

    res.status(200).json({msg:'Account has been deleted'})
}


module.exports = {
    getUserData,
    Login,
    Register,
    verifyEmail,
    ForgetPassword1,
    forgetPassword2,
    forgetPassword3,
    deleteAccount,
    Logout
}