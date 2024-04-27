const express = require('express')
const authProtect = require('../middlewares/authMiddleware')

const {getUserData, Login, Register, verifyEmail, ForgetPassword1, forgetPassword2, forgetPassword3, deleteAccount, Logout} = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/', getUserData)

userRouter.post('/login', Login)

userRouter.get('/logout',authProtect, Logout)

userRouter.post('/register', Register)

userRouter.get('/:id/verify/:token', verifyEmail)

userRouter.post('/forgetPassword1', ForgetPassword1)

userRouter.get('/users/:id/changepassword/:token', forgetPassword2)

userRouter.post('/users/:id/changepassword/:token',forgetPassword3)

userRouter.get('/delete',authProtect, deleteAccount)

module.exports = userRouter