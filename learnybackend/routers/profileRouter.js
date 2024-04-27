const mongoose = require('mongoose')
const Profile = require('../models/profileModel')
const express = require('express')
const authProtect = require('../middlewares/authMiddleware')
const profileRouter = express.Router()

const {getProfile, updateProfile} = require('../controllers/profileController')

profileRouter.get('/',authProtect, getProfile)

profileRouter.post('/',authProtect, updateProfile)


module.exports = profileRouter




