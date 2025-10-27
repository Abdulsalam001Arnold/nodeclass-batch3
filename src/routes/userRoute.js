
import express from 'express';
import { getHome, postForm } from '../controllers/userController.js';

const userRouter = express.Router()
userRouter.get('/', getHome).post('/submit-form', postForm)

export default userRouter;
