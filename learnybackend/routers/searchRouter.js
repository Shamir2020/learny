const express = require('express')
const { searchCourse } = require('../controllers/searchController')

const searchRouter = express.Router()


searchRouter.get('/:keyword', searchCourse)


module.exports = searchRouter
