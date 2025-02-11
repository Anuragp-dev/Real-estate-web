import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import dotenv from "dotenv"





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




app.listen(8800, () => {
    console.log("server is running")
})