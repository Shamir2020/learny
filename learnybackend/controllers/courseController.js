const mongoose = require('mongoose')
const Course = require('../models/courseModel')
const Category = require('../models/courseCategoryModel')
const User = require('../models/userModel')
// API Access - Admin only
// Protect Auth 
const getACourse = async (req, res) => { 
    const id = req.params.id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg:'Invalid course id'})
    }
    const course = await Course.findById(id)

    if (!course){
        return res.json({error:'Course does not exists'})
    }
    res.status(200).json(course)
}

const getViewPageCourseDetails = async (req, res)=>{
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg:'Invalid course id'})
    }
    const course = await Course.findById(id).populate({
        path:'teachers',
        populate: {
            path: 'profile',
            model: 'Profile'
        }
    })

    if (!course){
        return res.json({error:'Course does not exists'})
    }
    res.status(200).json(course)
}

const getAllCourses = async (req, res) =>{
    const courses = await Course.find({})

    res.status(200).json(courses)
}

const createCourse = async (req, res) =>{

    console.log('create a course now...')
    // Create a Course here
    const id = req.params.id 
    

    if (!req.body.title){
        return res.status(400).json({error:'Title is required'})
    }
    if (!req.body.description){
        return res.status(400).json({error:'Title is required'})
    }
    if (!req.body.courseCode) {
        return res.status(400).json({error:'Course Code is required'})
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.category)){
        return res.status(400).json({error:'Invalid category ID'})
    }
    

    const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        courseCode: req.body.courseCode,
        courseImage: req.file.path

    })
    
    if (!course){
        return res.status(400).json({error:'Invalid course input data'})
    }

    const teachers = UniqueArray(req.body.teachers)

    console.log(teachers)

    // await course.teachers.push(...teachers)
    // await course.save()

    const category = await Category.findById(req.body.category)
    category.courses.push(course._id)
    await category.save()

    return res.json({data: course})
}

const updateACourse = async (req, res) => {
    const id = req.params.id 
    

    if (!req.body.title){
        return res.status(400).json({error:'Title is required'})
    }
    if (!req.body.description){
        return res.status(400).json({error:'Title is required'})
    }
    if (!req.body.courseCode) {
        return res.status(400).json({error:'Course Code is required'})
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.category)){
        return res.status(400).json({error:'Invalid category ID'})
    }
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid Course ID'})
    }
    var course 

    if (req.file){
        course = await Course.findByIdAndUpdate({_id:id},{
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            courseCode: req.body.courseCode,
            courseImage: req.file.path
        })
    }
    else {
        course = await Course.findByIdAndUpdate({_id:id},{
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            courseCode: req.body.courseCode,
        })
    }
    if (!course){
        return res.status(400).json({error:'Invalid course input data'})
    }
    // Work here to update teachers

    console.log(req.body.teachers)
    console.log(req.body.students)

    if (req.body.teachers.length != 0) {
        var teachers = UniqueArray(req.body.teachers)
        

        for(var i=0; i<teachers.length; i++){
            console.log('Inside for block')
            if (!course.teachers.includes(teachers[i])){
                console.log('inside if block')
                course.teachers.push(teachers[i])

                const user = await User.findById(teachers[i])
                user.courses.push(course._id)
                await user.save()
                console.log('teacher saved')

            }
        }
        await course.save()
    }

    

    if (req.body.students.length != 0) {
        var students = UniqueArray(req.body.students)
        console.log(students)

        for(var i=0; i<students.length; i++){
            if (!course.students.includes(students[i])){
                course.students.push(students[i])

                const user = await User.findById(students[i])
                user.courses.push(course._id)
                await user.save()

            }
        }
        await course.save()
        
    }

    


    const category = await Category.findById(req.body.category)
    if (!category.courses.includes(course._id)){
        category.courses.push(course._id)
        await category.save()
    }

    return res.json({data: course})
}

const UniqueArray = (value) =>{
    var array
    if (value.includes(',')){
        array = value.split(',')
    }else {
        array = [value]
    }
    var ul = []
    for (var i=0; i<array.length; i++){
        if (! ul.includes(array[i]) && array[i] != '' && array[i] != null){
            ul.push(array[i])
        }
    }
    return ul
}

const deleteACourse = async (req, res) =>{
    const id = req.params.id 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({'error':'Invalid ID'})
    }
    const course = await Course.findById(id)

    if(!course){
        return res.status(404).json({"error":'Course does not exists'})
    }
    const data = await Course.findByIdAndDelete(id)

    res.status(200).json(data)
}

const GetTeacherCourse = async (req, res) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'Invalid ID'})
    }
    const teacher = await User.findById(id).populate('courses')

    res.status(200).json(teacher)
}


module.exports = {
    getACourse,
    getAllCourses,
    createCourse,
    updateACourse,
    deleteACourse,
    GetTeacherCourse,
    getViewPageCourseDetails
}