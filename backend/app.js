import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import PostRoutes from "./routes/postRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"






dotenv.config()

const app = express()




app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

// routes
app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", PostRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)





app.listen(8800, () => {
    console.log("server is running")
})