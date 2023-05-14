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

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log('connected to socket.io')

  socket.on("setup", (userData)=>{
    socket.join(userData._id)
    addUser(userData._id, socket.id);
    io.emit("getUsers", users);
    socket.emit("connected")
  })

  socket.on('join chat', (room) => {
    socket.join(room)
  })
  
  socket.on('typing', (room,user)=> {
    socket.in(room).emit('typing', user)
  })
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
    removeUser(socket.id);
    io.emit("getUsers", users);
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});