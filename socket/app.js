import { Server } from "socket.io";



const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
})


// users

let onlineUser = []

const addUser = (userId, socketId) => {
    const userExist = onlineUser.find((user) => user.userId === userId)

    if (!userExist) {
        onlineUser.push({ userId, socketId });
    }
}

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === user)
}


io.on("connection", (socket) => {
    socket.on("new", (userId) => {
        addUser(userId, socket.id)
    })


    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId)
        io.to(receiver.socketId).emit("getMessage", data)
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
    })
})





io.listen("4000")