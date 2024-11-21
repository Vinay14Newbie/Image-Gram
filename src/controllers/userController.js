import { countUsersService, signUpService, findAllUsersService, signInUserService } from "../services/userService.js"

export async function signUp(req, res){
    console.log("req body ", req.body);

    try {
        // const user = await signUpService({
        //         username: req.body.username, 
        //         email: req.body.email, 
        //         password: req.body.password
        //     });
        // OR

        const user = await signUpService(req.body);   

        const count = await  countUsersService();

        console.log(user);
        
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: user,
            totalUsersCount: count
        })
    } catch (error) {

        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }


        // check for mail only
        // if(error.code === 11000 && error.keyPattern.email){ /// Check specifically for email duplicates
        //     console.log("Mail already exist");
        //     return res.status(409).json({
        //         success: false,
        //         message: "Email already exists"
        //     });
        // }

        return res.status(500).json({
            success: false,
            message: "failed to create a user"
        })
    }
}


export async function getProfile(req, res) {
    // return unimplemented
    return res.status(201).json({
        success: false,
        message: "Not implemented"
    })
}


export async function findAllUsers(req, res) {
    try {
        const users = await findAllUsersService();
        const count = await countUsersService();
        
        return res.status(200).json({
            success: true,
            message: "users retrieved successfully",
            data: users,
            totalUsers: count
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "something went wrong while fetching users"
        })
    }    
}


export async function signIn(req, res) {
    console.log("Controller layer signin");
    
    try {
        console.log("controller layer request body", req.body);
        
        const token = await signInUserService(req.body);
        console.log("controller layer: ", token); 
        
        res.cookie("access_token", token, { 
            httpOnly: true, 
            secure: false,
            maxAge: 3600000  // Cookie expires in 1 hour 
        })
        return  res.status(200).json({
            success: true,
            message: "user signed in successfully",
            data: token
        })
    } catch (error) {
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })     
    }
}