import jwt from "jsonwebtoken"
import { User } from "../models/userModel";
const isAuthenticated = async(req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(200).json({
                message:"User not authenticated."
            })
        };

        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decode);
        
        if(!decode){ // decode ke andr tokendata milega
            return res.status(401).json({message:"Invalid token."});
        };
        req.id = decode.id;  //user ki id


        next();
    } catch (error) {
        console.log(error);
        
    }
};

export default isAuthenticated;