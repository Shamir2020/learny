const express = require('express')
const { getConsultations, createConsultation } = require('../controllers/consultationController')


const consultationRouter = express.Router()


consultationRouter.get('/:id', getConsultations)

consultationRouter.post('/', createConsultation)

module.exports = consultationRouter