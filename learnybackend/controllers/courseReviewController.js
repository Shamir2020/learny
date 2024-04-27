const mongoose = require('mongoose')
const Course = require('../models/courseModel')
const Review = require('../models/reviewModel')

const createReview = async (req, res)=>{
  
    const review = await Review.create({
        reviewText: req.body.reviewText,
        reviewStar: req.body.reviewStar,
        user: req.body.userId
    })

    if (!review){
        return res.status(400).json({error:'Review could not be added'})
    }

    const course = await Course.findById(req.body.courseId)

    course.reviews.push(review.id)

    await course.save()

    if(!course){
        return res.status(400).json({error:'Review to the course could not be added'})
    }

    res.status(200).json({msg:'Review has been added to the course.'})
}

const getCourseReviews = async (req, res)=>{
    const courseId = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(courseId)){
        return res.status(400).json({error:'Invalid ID'})
    }

    const course = await Course.findById(courseId).populate({
        path: 'reviews',
        populate: {
            path: 'user',
            model: 'User',
            populate: {
                path: 'profile',
                model: 'Profile'
            }
        }
    })

    res.status(200).json(course)
}


module.exports = {
    createReview,
    getCourseReviews
}