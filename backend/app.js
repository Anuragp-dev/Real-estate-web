import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/authRoutes.js"

const app = express()




app.use(cookieParser())
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)




app.listen(8800, () => {
    console.log("server is running")
})