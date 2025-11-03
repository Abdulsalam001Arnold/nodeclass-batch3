
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET

export const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        console.log("token secret:", secret)
  
        
        req.user = await userModel.findById(decoded.id).select('-password');
  
        next();
      } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  