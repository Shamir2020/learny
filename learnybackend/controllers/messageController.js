const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.conversationId)){
        return res.status(400).json({error:'Invalid Conversation ID'})
    }
    const messages = await Message.find({conversationId: req.params.conversationId})

    if (!messages) {
        return res.status(400).json({error:'Messages could not be fetched'})
    }

    res.status(200).json(messages)
}

const CreateMessage = async (req, res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.body.conversationId)){
        return res.status(400).json({error:'Invalid Conversation ID'})
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.senderId)){
        return res.status(400).json({error:'Invalid Sender ID'})
    }
    const message = await Message.create({
        conversationId: req.body.conversationId,
        senderId: req.body.senderId,
        text: req.body.text
    })

    if (!message) {
        return res.status(400).json({error:'Message could not be created'})
    }
    res.status(200).json(message)
}




module.exports = {
    getMessages,
    CreateMessage
}