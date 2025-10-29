
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: String,
        minLength: 8,
        maxLength: 16,
        required: true
    }
}, {timestamps: true})

export const userModel = mongoose.model('User', userSchema)