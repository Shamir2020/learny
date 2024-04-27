const express = require('express')
const courseRouter = express.Router()
const { getACourse, getAllCourses, createCourse, updateACourse, deleteACourse, GetTeacherCourse, getViewPageCourseDetails } = require('../controllers/courseController')

const authProtect = require('../middlewares/authMiddleware')
const ProtectRole = require('../middlewares/userRoleMiddleware')

courseRouter.get('/:id',getACourse)

courseRouter.get('/view-page/:id',getViewPageCourseDetails)

courseRouter.get('/',getAllCourses)

courseRouter.post('/',authProtect, ProtectRole('admin'), createCourse)

courseRouter.post('/:id',authProtect, ProtectRole('admin'), updateACourse)

courseRouter.delete('/:id', authProtect, ProtectRole('admin'), deleteACourse)

courseRouter.get('/user/:id', GetTeacherCourse)


module.exports = courseRouter