
import { userModel } from "../models/userModel.js";
import { userValidation } from "../validator/joiValidator.js";
import { generateToken } from "../utils/generateToken.js";
import { profileModel } from "../models/profileSchema.js";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";

export async function getHome(req, res) {
    res.send("Welcome to the Home Page, class 3");
}

export async function postForm(req, res) {
    const { name, email } = req.body
    if(!name && !email) {
        res.status(400).json({
            message: "Name and Email are required"
        })
    }
    res.status(200).json({
        message: "Form submitted",
        data: {
            name, 
            email
        }
    })
}

export async function signUp(req, res) {
    await connectDB()
    const { name, email, password, bio, gender, age } = req.body
    if(!name && !email && !password) {
        res.status(400).json({
            error: true,
            message: "Please fill all required fields"
        })
    }

    const {error} = userValidation.validate({
        name,
        email,
        password,
        bio,
        gender,
        age
    })

    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const existingUser = await userModel.findOne({email})

    if(existingUser) {
        return res.status(400).json({
            message: "User already exists!!"
        })
    }

    const profile = await profileModel.create({
        bio,
        age, 
        gender,
        user: null
    })

    const newUser = await userModel.create({
        name,
        email,
        password,
        profile: profile._id
    })

       await profileModel.findByIdAndUpdate(profile._id, { user: newUser._id })
       const populatedUser = await userModel.findById(newUser._id).populate('profile')
    const token = await generateToken(newUser._id)

    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message: "User created successfully",
        data: {
            populatedUser,
        }
    })
};

export async function login(req, res) {
    await connectDB()
    try{
       const { email, password } = req.body
       const { error } = userValidation.validate({ email, password }, { presence: "required" 
       })
        if(email !== "" && password !== "") {
            const existingUser = await userModel.findOne({ email }).populate('profile')
            if(existingUser) {
                const comparePassword = await bcrypt.compare(password, existingUser.password)
                if(comparePassword) {
                    const token = await generateToken(existingUser._id)

                    res.cookie("authToken", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })
                    return res.status(200).json({
                        message: "Login successful",
                        data: {
                            existingUser,
                        }
                    })
                }else{
                    return res.status(400).json({
                        message: "Invalid credentials"
                    })
                }
            }else{
                return res.status(404).json({
                    message: "User not found, please sign up"
                })
            }
        }else{
            return res.status(400).json({
                message: `${error?.details[0].message}`
            })
        }
   }catch(err){
    if(err instanceof Error){
        console.error(err.message)
    }
   }
}


export async function getSingle(req, res) {
    const { id } = req.params

    const user = await userModel.findById(id)
    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User found",
        user
    })
}

export async function deleteUser(req, res) {
    const { id } = req.params
    if(!id) {
        return res.status(400).json({
            message: "User ID is required"
        })
    }
    const deletedUser = await userModel.findByIdAndDelete(id)
    if(!deletedUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User deleted successfully",
        deletedUser
    })
}


export async function logOut(req, res) {
        try{
            res.clearCookie("authToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            res.status(200).json({
                message: "Logged out successfully"
            })
        }catch(err) {
            if(err instanceof Error) {
                console.error(err.message)
                res.status(500).json({
                    message: "Server error",
                    errorMessage: err.message
                })
            }
        }
}