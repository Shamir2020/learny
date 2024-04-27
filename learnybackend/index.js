const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const app = express()
const multer = require('multer')
const upload = multer({dest:'uploads/'})

 
const userRouter = require('./routers/userRouter')
const profileRouter = require('./routers/profileRouter')
const adminRouter = require('./routers/adminRouter')
const courseRouter = require('./routers/courseRouter')
const categoryRouter = require('./routers/categoryRouter')
const testRouter = require('./routers/testRouter')
const randomRouter = require('./routers/randomRouter')
const courseReviewRouter = require('./routers/courseReviewRouter')
const {universityAnnouncementRouter, courseAnnouncementRouter} = require('./routers/AnnouncementRouter')
const courseContentRouter = require('./routers/courseContentRouter')
const lectureRouter = require('./routers/lectureRouter')
const conversationRouter = require('./routers/conversationRouter')
const messageRouter = require('./routers/messageRouter')
const searchRouter = require('./routers/searchRouter')
const consultationRouter = require('./routers/consultationRouter')


app.get('/', async (req, res)=>{
    res.status(200).json({msg:'Hello World'})
})

mongoose.connect(process.env.MONGO_URI)
.then((msg)=>{
    console.log('Connected to DB')
    app.listen(process.env.port, async(req, res)=>{
        console.log(`Server running at port ${process.env.port}`)
    })
})
.catch((error)=>{
    throw new error
})

// Middleware 
app.use(express.json())

// Routes
app.use('/api/user',userRouter)

app.use('/api/profile', upload.single('profilePic'), profileRouter)

app.use('/api/admin',adminRouter)

app.use('/api/course', upload.single('courseImage'), courseRouter)

app.use('/api/category',upload.single('categoryImage'), categoryRouter)

app.use('/api/random',randomRouter)

app.use('/api/announcement/university',universityAnnouncementRouter)

app.use('/api/announcement/course',courseAnnouncementRouter)

app.use('/api/courseReview', courseReviewRouter)

app.use('/api/courseContent', courseContentRouter)

app.use('/api/lecture', lectureRouter)

app.use('/api/conversation', conversationRouter)

app.use('/api/message', messageRouter)

app.use('/api/search', searchRouter)

app.use('/api/test',upload.single('image'), testRouter)

app.use('/api/consultation', consultationRouter)

// Define static folder for image
app.use('/uploads', express.static('uploads'))