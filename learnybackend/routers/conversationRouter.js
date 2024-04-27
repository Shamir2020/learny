const express = require('express')

const conversationRouter = express.Router()
const {getConversation, CreateConversation, getConversations} = require('../controllers/conversationController')

conversationRouter.get('/:id', getConversation)

conversationRouter.post('/', CreateConversation)

conversationRouter.get('/all/:id', getConversations)

module.exports = conversationRouter