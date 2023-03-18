const { request } = require("express")
const express=require("express")
const {Server}=require("socket.io")
const http=require("http")
const app=express()
const httpServer=http.createServer(app)
   
const users={}
httpServer.listen(7600)
const wss=new Server(httpServer)
wss.on("connection",(socket)=>{
    console.log("clint connected");
 
    socket.on("new-user-joined",(name)=>{
        console.log("new-user",name);
        users[socket.id]=name
       
        socket.broadcast.emit("usr-joint",name)
    })
    socket.on("send",(massage)=>{
      
        socket.broadcast.emit("received",{massage:massage,name:users[socket.id]})
       
     
    })
    socket.on("disconnect",(massage)=>{
      
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id]
    })
    
})

app.get("/",(req,res)=>{
    res.send("chat application")
})

app.get("/contact",(req,res)=>{
    res.send("contact here")
})