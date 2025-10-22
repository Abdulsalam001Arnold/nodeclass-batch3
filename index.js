
import express from 'express' //module
import userRouter from './routes/userRoute.js'
const app = express()

app.use(userRouter)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
