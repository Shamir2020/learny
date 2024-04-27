const express = require('express')

const testRouter = express.Router()

const TestImage = require('../models/testImageModel')

testRouter.post('/upload-image', async (req, res)=>{

    console.log(req.body)
    console.log(req.file)
    if (! req.body.title || !req.file) {
        return res.status(400).json({error:'Fill all the fields'})
    }

    const data = new TestImage({
        title: req.body.title,
        image: req.file.path
    })

    res.status(200).json({data})
})



module.exports = testRouter