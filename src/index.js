
import express from 'express' //module
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database connected")).catch((err) => console.error(err))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
// mongoose
app.listen(3000, () => {
    console.log('Server running on port 3000')
})
