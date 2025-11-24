
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
    origin: "https://web-dev-batch-3.vercel.app",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
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