const mongoose = require('mongoose')

const testImageSchema = mongoose.Schema({
    title: String,
    image: String
})


module.exports = mongoose.model('TestImage',testImageSchema)