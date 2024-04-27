const express = require('express')
const { getAdmin, LoginAdmin, getTeachers, getStudents } = require('../controllers/adminController')
const authProtect = require('../middlewares/authMiddleware')
const ProtectRole = require('../middlewares/userRoleMiddleware')
const adminRouter = express.Router()

adminRouter.get('/',authProtect,ProtectRole('admin'), getAdmin)

adminRouter.post('/',LoginAdmin)

// Manage teachers 

adminRouter.get('/teacher',authProtect,ProtectRole('admin'), getTeachers)

// Manage Teachers 


// Manage Students 

adminRouter.get('/student',authProtect, ProtectRole('admin'), getStudents)

// Manage Students 

module.exports = adminRouter