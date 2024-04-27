const Course = require('../models/courseModel')


const searchCourse = async (req, res)=>{
    const keyword = req.params.keyword

    try {
        const courses = await Course.find({
            $or: [
                {title: {$regex: `${keyword}`, $options: 'i'}},
                {courseCode: {$regex: `${keyword}`, $options: 'i'}},
            ]
        })
    
        res.status(200).json(courses)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    searchCourse
}