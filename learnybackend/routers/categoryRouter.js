const express = require('express')

const categoryRouter = express.Router()

const {getAllCategories, getACategory, createACategory, updateACategory, deleteACategory} = require('../controllers/categoryController')
const authProtect = require('../middlewares/authMiddleware')
const ProtectRole = require('../middlewares/userRoleMiddleware')

categoryRouter.get('/', getAllCategories)

categoryRouter.get('/:id', getACategory)

categoryRouter.post('/',authProtect,ProtectRole('admin'), createACategory)

categoryRouter.patch('/:id',authProtect,ProtectRole('admin'), updateACategory)

categoryRouter.delete('/:id',authProtect, ProtectRole('admin'), deleteACategory)


module.exports = categoryRouter