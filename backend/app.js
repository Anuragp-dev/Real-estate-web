import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js"






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




app.listen(8800, () => {
    console.log("server is running")
})