
import express from 'express';
import { getHome, postForm, signUp, login } from '../controllers/userController.js';

const userRouter = express.Router()
userRouter.get('/', getHome).post('/submit-form', postForm).post('/signup', signUp).post("/login", login)

export default userRouter;
