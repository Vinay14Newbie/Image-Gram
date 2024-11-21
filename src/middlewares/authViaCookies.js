import { verifyJwtToken } from "../utils/jwt.js";
import { checkIfUserExistService } from "../services/userService.js";


export const authorizationViaCookies = async (req, res, next) => {
    console.log("authorizationViaCookies: ", req.cookies);
    
    const token = req.cookies.access_token;
    if(!token){
        return res.status(400).json({
            success: false,
            message: "token is required"
        })
    }

    try {
        const response = verifyJwtToken(token);
        const doesUserExist = await checkIfUserExistService(response.email);

        if(!doesUserExist){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        req.user = response;

        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
};