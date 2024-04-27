const express = require('express')
const randomRouter = express.Router()
const {getCatelogTeachers} = require('../controllers/randomController')


randomRouter.get('/teachers',getCatelogTeachers)



module.exports = randomRouter