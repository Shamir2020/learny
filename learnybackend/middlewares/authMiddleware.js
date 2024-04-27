const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const authProtect = async (req, res, next) => {


    try{
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const id = decoded.id 

            const user = await User.findById(id).select('-password')

            if(user){
                req.user = user 
                next()
            }
            else {
               
                res.status(401).json({error:'Not authorized'})
            }

        }
        else {
            res.status(401).json({error:'Not authorized'})
        }
    }
    catch(error){
        
        res.status(401).json({error:'Not authorized'})
    }
}

module.exports = authProtect