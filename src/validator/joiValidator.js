
import Joi from "joi";

export const userValidation = Joi.object({
    name: Joi.string().max(30).min(3).allow(" "),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
    bio: Joi.string().min(5).max(200).allow(" "),
    gender: Joi.string().required(),
    age: Joi.string().required()
})