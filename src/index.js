
import express from 'express'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
const app = express()
dotenv.config()

connectDB()


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)


if(process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}

export default app;