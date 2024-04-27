const express = require('express')
const {createReview, getCourseReviews} = require('../controllers/courseReviewController')
const authProtect = require('../middlewares/authMiddleware')

const courseReviewRouter = express.Router()


courseReviewRouter.post('/',authProtect, createReview)


courseReviewRouter.get('/:id', getCourseReviews)


module.exports = courseReviewRouter
