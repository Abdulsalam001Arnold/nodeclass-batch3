
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel';

const secret = process.env.JWT_SECRET

export const protect = async(req, res, next) =>  {
    let token;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret)
            req.user = await userModel.findById(decoded.id).select('-password')
            next()
        }
    } catch (err) {
        if(err instanceof Error) {
            console.error(err.message)
        }
    }
}