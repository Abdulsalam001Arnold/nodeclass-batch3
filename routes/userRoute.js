
import express from 'express';
import { getHome } from '../controllers/userController.js';

const userRouter = express.Router()
userRouter.get('/', getHome);

export default userRouter;
