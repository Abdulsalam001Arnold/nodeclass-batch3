
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getHome, postForm, signUp, login, getSingle } from '../controllers/userController.js';

const userRouter = express.Router()
userRouter.get('/', getHome).post('/submit-form', protect, postForm).post('/signup', signUp).post("/login", login).get('/user/:id', getSingle)

export default userRouter;
