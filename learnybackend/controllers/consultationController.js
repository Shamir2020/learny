const mongoose = require('mongoose')
const Consultation = require('../models/consultationModel')



const getConsultations = async (req, res)=>{
    const id = req.params.id 

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid teacher id'})
    }

    try {
        const consultaions = await Consultation.find({teacher: id})

        res.status(200).json(consultaions)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
    
}

const createConsultation = async (req, res)=>{

    if (!mongoose.Types.ObjectId.isValid(req.body.teacher)){
        return res.status(400).json({error: 'Invalid teacher id'})
    }
    try {
        const consultaion = await Consultation.create({
            teacher: req.body.teacher, 
            count: req.body.count,
            day: req.body.day,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            meetLink: req.body.meetLink

        })
        
        if (!consultaion){
            return res.status(400).json({error: 'Consultation could not be created'})
        }
        res.status(200).json(consultaion)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    getConsultations,
    createConsultation
}