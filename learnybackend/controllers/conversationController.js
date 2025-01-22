const mongoose = require('mongoose')
const Conversation = require('../models/conversationModel')

const getConversation = async (req, res)=>{
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid conversation ID"})
    }

    const conversation = await Conversation.findById(id).populate({
        path: 'members',
        populate: {
            path: 'profile',
            model: 'Profile'
        }
    })

    if (!conversation){
        return res.status(400).json({error:'Conversation was not found'})
    }
    res.status(200).json(conversation)

}

const getConversations = async (req, res)=>{
    const userId = req.params.id 
    if (!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({error:"Invalid User ID"})
    }

    const conversations = await Conversation.find({
        members: { $in: [userId] }
    }).populate({
        path: 'members',
        populate: {
            path: 'profile',
            model: 'Profile'
        }
    })

    if (!conversations){
        return res.status(404).json({error:'No conversation found'})
    }

    res.status(200).json(conversations)

}


const CreateConversation = async (req, res)=>{

    if (!mongoose.Types.ObjectId.isValid(req.body.senderId) || !mongoose.Types.ObjectId.isValid(req.body.receiverId)){
        return res.status(400).json({error: 'Invalid members ID'})
    }
    try {
        let conversation = await Conversation.findOne({
            members: {$all: [req.body.senderId, req.body.receiverId]}
        })

        if (!conversation){
            conversation = await Conversation.create({
                members: [req.body.senderId, req.body.receiverId]
            })
        }

        return res.status(200).json(conversation)

    }
    catch(error){
        return res.status(400).json({error:'Conversation could not be created'})
    }

    
}



module.exports = {
    getConversation,
    CreateConversation,
    getConversations
}
