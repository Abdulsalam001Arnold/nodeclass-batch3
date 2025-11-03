
import jwt from 'jsonwebtoken'

export async function generateToken(userId){
    try {
        if(!userId) console.error("No ID provided")
            const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "20m"
    })

    return token;
    } catch (err) {
        if(err instanceof Error){
            console.error(err.message)
        }
    }
}