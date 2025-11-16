
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET

export const protect = async (req, res, next) => {
    try{
      const token = req.cookies.authToken;

      if(!token) {
        return res.status(401).json({
            message: "Not authorized, no token"
        })
      }

      const decoded = jwt.verify(token, secret)

      req.user = await userModel.findById(decoded.id).select('-password');

      if(!req.user) {
        return res.status(401).json({
          message: "User no longer exists"
        })
      }
    }catch(err){
        if(err instanceof Error) {
            console.error(err.message)
            return res.status(401).json({
                message: "Not authorized, token failed",
                errorMessage: err.message
            })
        }
    }
  };
  