

function ProtectRole(role){
    return (req, res, next) => {
        if (req.user.role != role){
            return res.status(401).json({error:'Not authorized'})
        }
        else {
            console.log(req.user)
            next()
        }
    }
}

module.exports = ProtectRole