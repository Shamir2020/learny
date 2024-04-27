const Category = require('../models/courseCategoryModel')
const mongoose = require('mongoose')

const getACategory = async (req, res) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid id'})
    }
    const category = await Category.findById(id)
    if (!category){
        return res.status(400).json({error:'Category does not exists'})
    }
    res.status(200).json(category)
}

const getAllCategories = async (req, res) => {
    const categories = await Category.find({})

    res.status(200).json(categories)
}

const createACategory = async (req, res) =>{


    console.log(req.body)
    console.log(req.file)
    
    if (!req.body.category) {
        return res.status(400).json({error:'Fill the category field'})
    }
    const matchExists = await Category.findOne({category:req.body.category})

    if (matchExists){
        return res.status(400).json({error:'Category already exists'})
    }

    const category = await Category.create({
        category:req.body.category,
        description: req.body.description,
        categoryImage: req.file.path
    })
    if (!category) {
        return res.status(400).json({msg:'Category not created!'})
    }
    res.status(200).json({category})
}

const updateACategory = async (req, res) => {
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid id'})
    }


    var category
    if (req.file){
        category = await Category.findByIdAndUpdate({_id:id},{category: req.body.category, description: req.body.description, categoryImage: req.file.path})
    }
    else {
        category = await Category.findByIdAndUpdate({_id:id},{category: req.body.category, description: req.body.description})
    }

    
    if (!category){
        return res.status(400).json({error:'Category does not exists'})
    }
    res.status(200).json(category)
    
}

const deleteACategory = async (req, res) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Invalid id'})
    }
    const category = await Category.findById(id)

    if (!category){
        return res.status(400).json({error:'No such category found'})
    }

    const response = await Category.findByIdAndDelete(id)

    res.status(200).json(response)
}


module.exports = {
    getACategory, getAllCategories, createACategory, updateACategory, deleteACategory
}