const express = require('express')

const lectureRouter = express.Router()
const {CreateALecture, UpdateLecture, GetALecture} = require('../controllers/lectureController')

lectureRouter.post('/', CreateALecture)

lectureRouter.patch('/:id', UpdateLecture)

lectureRouter.get('/:id', GetALecture)

module.exports = lectureRouter