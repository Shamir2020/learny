const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000'
    },
})

var users = []

const addUser = (userId, socketId)=>{
    add = true    
    for (i=0; i<users.length;i++){
        if (users[i].userId == userId){
            users[i].socketId = socketId
            add = false
        }
    }
    if (add){
        users.push({userId:userId, socketId: socketId})
    }

    // console.log(users)
}

const removeUser = (socketId)=>{
    newUsers = []
    for (i=0; i<users.length;i++){
        if (users[i].socketId == socketId){
            continue
        }
        newUsers.push(users[i])
    }
    return newUsers
}

const getUser = (userId)=>{
    let u = undefined 
    users.map((user)=>{
        if (user.userId == userId){
            u = user
        }
    })
    
    return u 
    
}

io.on('connection', (socket)=>{
    console.log('An user connected to Socket server')

    // Adding User
    socket.on('addUser',userId=>{
        addUser(userId, socket.id)

    })

    // Socket disconnect
    socket.on('disconnect',()=>{
        console.log('Someone got disconnected')
        users = removeUser(socket.id)

    })

    // Send Message 

    socket.on('sendMessage',(data)=>{
        console.log('A message received')
        const user = getUser(data.receiverId)
        console.log(user)
        if (user){
            io.to(user.socketId).emit('getMessage',{
                senderId: data.senderId,
                text: data.text,
                createdAt: new Date()
    
            })
        }
    })

})