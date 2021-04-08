const express = require("express");

const { Socket } = require("net");

const app = express();

const server = require("http").Server(app)

const io = require("socket.io")(server)

const {v4:uuidV4} = require("uuid")

///////////////////////// setup view engine + pulic path 

app.set("view engine" , "ejs")

app.use(express.static("public"))

////////////////////////// routes

app.get('/' , (req ,res) => 
{
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room' , (req ,res) => 
{
    res.render('room' , {roomId:req.params.room})
})

///////////////////////// socket events 

io.on('connection' , socket => {

    socket.on('join-room' , (roomId , userId) => {
       socket.join(roomId)

       // socket.to(roomId).broadcast.emit('user-connected' , userId)

      socket.to(roomId).emit('user-connected')
    })

})

///////////////////////// server port 

server.listen(3000)
