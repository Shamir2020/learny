const express = require('express')

const { GetDepartments, GetADepartment, CreateDepartment, UpdateDepartment, DeleteDepartment } = require('../controllers/departmentController')

const departmentRouter = express.Router()



departmentRouter.get('/', GetDepartments)

departmentRouter.get('/:id', GetADepartment)

departmentRouter.post('/', CreateDepartment)

departmentRouter.patch('/:id', UpdateDepartment)

departmentRouter.delete('/:id', DeleteDepartment)


module.exports = departmentRouter