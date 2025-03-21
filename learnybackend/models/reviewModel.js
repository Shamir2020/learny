const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewText: {
        type: String,
    },
    reviewStar: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema)