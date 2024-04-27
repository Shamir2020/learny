const express = require('express')
const {getMessages, CreateMessage} = require('../controllers/messageController')

const messageRouter = express.Router()


messageRouter.get('/:conversationId', getMessages)

messageRouter.post('/', CreateMessage)


module.exports = messageRouter