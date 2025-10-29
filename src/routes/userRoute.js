
import express from 'express';
import { getHome, postForm, signUp } from '../controllers/userController.js';

const userRouter = express.Router()
userRouter.get('/', getHome).post('/submit-form', postForm).post('/signup', signUp)

export default userRouter;
