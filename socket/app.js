import { server } from "socket.io"


const io = new server({
    cors:{
        origin:"http://localhost:5173"
    }
})


io.on("connection", (socket)=> {
    console.log(socket)
})