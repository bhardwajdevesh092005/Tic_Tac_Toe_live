import express from "express"
import { Server } from "socket.io";
import {createServer} from 'http'
import { uid } from "uid";
import cors from 'cors'
const PORT = 4000;
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        // methods:['GET','POST'],
        credentials:true,
    }
});
app.use(cors({
    origin:"*",
    // methods:['GET','POST'],
    credentials:false,
    // optionsSuccessStatus:200
}))
let curr_room = "";
const room_data = new Map;
const room_pl = new Map;
const room_provider = ()=>{
    if(curr_room){
        let temp = curr_room;
        room_pl.set(`${curr_room}`,'2');
        curr_room = "";
        return temp;
    }else{
        curr_room = uid();
        room_pl.set(`${curr_room}`,'1');
        return curr_room;
    }
}
io.on("connection",(socket)=>{
    socket.emit('welcome',"Welcome to the app");
    console.log(socket.id)
    let room_id = room_provider();
    socket.join(room_id);
    if(room_pl.get(room_id) == '2'){
        io.to(room_id).emit('joined-as-sec',socket.id);
    }else{
        io.to(room_id).emit('joined-as-fir',socket.id);
    }
    room_data.set(`${socket.id}`,room_id);
    console.log("The current room data: ",room_data);
    socket.on('disconnect',async ()=>{
        socket.to(room_data.get(`${socket.id}`)).emit('opp-disc',"Opponen_Disconnected");
        if(room_data.get(`${socket.id}`) === curr_room){
            curr_room = "";
            console.log("curr_room: ",curr_room);
        }
        room_pl.delete(room_data.get(`${socket.id}`));
        console.log(room_pl);
        room_data.delete(`${socket.id}`);
        console.log(`User(${socket.id}) disconnected from room; curr_room : `,curr_room)
        console.log(room_data);
    })
    socket.on('user_name',(args)=>{
        socket.to(room_data.get(`${socket.id}`)).emit('opp_name',args);
    })
    socket.on('game-change',(args)=>{
        console.log(args);
        socket.to(room_data.get(`${socket.id}`)).emit('rec-game-change',args);
    })
})
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});