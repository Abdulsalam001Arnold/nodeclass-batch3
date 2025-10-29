
import { userModel } from "../models/userModel.js";
import { userValidation } from "../validator/joiValidator.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

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
    const { name, email, password } = req.body
    if(!name && !email && !password) {
        res.status(400).json({
            error: true,
            message: "Please fill all required fields"
        })
    }

    const {error} = userValidation.validate({
        name,
        email,
        password
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

    const newUser = await userModel.create({
        name,
        email,
        password
    })

    const token = await generateToken(newUser._id)

    res.status(201).json({
        message: "User created successfully",
        data: {
            newUser,
            token
        }
    })
};

export async function login(req, res) {
    const {email, password} = req.body
    if(!email && !password) {
        return res.status(400).json({
            message: "Please fill all required fields"
        })
    }

    const existingUser = await userModel.findOne({
        email
    })

    if(!existingUser){
        return res.status(404).json({
            message: "User does not exist, please sign up"
        })
    }

    const token = await generateToken(existingUser._id)

    const comparedPassword = bcrypt.compare(existingUser.password, password)

    if(comparedPassword == true) {
        return res.status(200).json({
            message: "User logged in.",
            data: {
                existingUser,
                token
            }
        })
    }else{
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
}
