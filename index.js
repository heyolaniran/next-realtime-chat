const express = require("express") ; 
const app = express() ; 
const http = require('http')
const cors = require('cors')

app.use(cors()) ; 

const {Server} = require('socket.io')
const server = http.createServer(app)

const io = new Server(server , { 
    cors : { 
        origin : ["http://localhost:3000" , "http://next-realtime-chat.vercel.app"] , 
        methods : ['GET' , 'POST', 'DELETE']
    }
})

io.on("connection", (socket) => {
        console.log(socket.id)


        socket.on("join_room" , (data) => { 
            console.log(`User ID: ${socket.id} joined ${data} room `)
            socket.join(data) ; 
        })

        socket.on("send_message", (data) => {
            socket.to(data.room).emit("receive_message", data)
        })

        socket.on("disconnect", () => { 
            console.log('User is disconnected ')
        })
})


server.listen('3001', () => { 
    console.log('Node server is running on 3001')
})

