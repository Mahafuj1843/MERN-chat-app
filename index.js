import app from "./app.js"
import { Server } from "socket.io";
import { connected } from './config/db.js'
const PORT=process.env.PORT || 1200;
const host = app.listen(PORT, ()=>{
    connected();
    console.log(`Server is running at port ${PORT}`)
})

const io = new Server(host, {
 pingTimeout: 60000,
 cors: {
 origin: "http://localhost:3000"
},
})

io.on("connection", (socket) => {
  console.log('connected to socket.io')

  socket.on("setup", (userData)=>{
    socket.join(userData._id)
    socket.emit("connected")
  })

  socket.on('join chat', (room) => {
    socket.join(room)
  })

  socket.on('typing', (room)=> socket.in(room).emit('typing'))
  socket.on('stop typing', (room)=> socket.in(room).emit('stop typing'))

  socket.on("new msg", (newMsgRecieved)=>{
    var chat = newMsgRecieved.chat
    if(!chat.users) return console.log("chat.users not defined")

    chat.users.forEach((user)=>{
       if(user._id == newMsgRecieved.sender._id) return;
       socket.in(user._id).emit("msg recieved", newMsgRecieved)
    })
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});