const express = require('express')

const {CreateCourseContent, getCourseContents, UpdateCourseContent, DeleteCourseContent} = require('../controllers/courseContentController')

const courseContentRouter = express.Router()


courseContentRouter.post('/', CreateCourseContent)

courseContentRouter.patch('/update', UpdateCourseContent)

courseContentRouter.get('/specific/:id', getCourseContents)

courseContentRouter.delete('/delete/:id', DeleteCourseContent)


module.exports = courseContentRouter