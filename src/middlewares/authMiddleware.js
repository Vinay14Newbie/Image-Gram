import { checkIfUserExistService } from "../services/userService.js";
import { verifyJwtToken } from "../utils/jwt.js";

export async function isAuthenticated(req, res, next){
    // check if jwt is passed in the headers
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(400).json({
            success: false,
            message: "token is required"
        })
    }

    // verify the token
    try {
        const response = verifyJwtToken(token);
        
        console.log("authMiddleware response for verifyJWTtoken: ", response);
        
        // check the token whether it still valid or not
        const doesUserExist = await checkIfUserExistService(response.email);

        if(!doesUserExist){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        req.user = response;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
}


export async function isAdmin(req, res, next) {
    console.log("isAdmin file: ", req.user);
    
    if(req.user.role != "admin"){
        return res.status(403).json({
            success: false,
            message: "unauthorized"
        })
    }

    next();
}