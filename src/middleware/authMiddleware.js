
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel';

const secret = process.env.JWT_SECRET

export const protect = (req, res, next) =>  {
    let token;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
    } catch (err) {
        
    }
}