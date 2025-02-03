import express from 'express'
import authRoutes from "./routes/authRoutes.js"

const app = express()





app.use(express.json())

app.use("/api/auth", authRoutes)
app.listen(8800, () => {
    console.log("server is running")
})