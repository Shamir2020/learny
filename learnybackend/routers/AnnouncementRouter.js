const express = require('express')

const {createUniversityAnnouncement, getUniversityAnnouncements, updateUniversityAnnouncement, deleteUniversityAnnouncement
    , CreateCourseAnnouncement,
    getCourseAnnouncements,
    UpdateCourseAnnouncement
} = require('../controllers/announcementController')

const courseAnnouncementRouter = express.Router()
const universityAnnouncementRouter = express.Router()

const authProtect = require('../middlewares/authMiddleware')
const ProtectRole = require('../middlewares/userRoleMiddleware')

courseAnnouncementRouter.get('/:id',getCourseAnnouncements)

courseAnnouncementRouter.post('/', CreateCourseAnnouncement)

courseAnnouncementRouter.patch('/:id', UpdateCourseAnnouncement)

// Course Announcements 



// University Announcements

universityAnnouncementRouter.get('/',getUniversityAnnouncements)

universityAnnouncementRouter.post('/',authProtect, ProtectRole('admin'), createUniversityAnnouncement)

universityAnnouncementRouter.patch('/:id',authProtect, ProtectRole('admin'), updateUniversityAnnouncement)

universityAnnouncementRouter.delete('/:id',authProtect, ProtectRole('admin'), deleteUniversityAnnouncement)

module.exports = {
    courseAnnouncementRouter,
    universityAnnouncementRouter
}