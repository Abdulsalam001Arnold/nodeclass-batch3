
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    bio: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
}, {timestamps: true})

export const profileModel = mongoose.model('Profile', profileSchema);