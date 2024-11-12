import { countAllUsers, createUser, findAllUsers, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt.js";


export const signUpService = async (createUserObject) => {
    // const username = createUserObject.username;
    // const email = createUserObject.email;
    // const password = createUserObject.password;

    try {
        const user = await createUser(createUserObject);

        return user;
    } catch (error) {
        if(error.code === 11000 && error.name === 'MongoServerError'){
            throw{
                status: 400, //bad request
                message: "user with the same username or email address already exists"
            }
        }
        throw error;        
    }
}

export const findUserByEmailService = async (email) => {
    const user = await findUserByEmail(email);
    return user;
}

export const countUsersService = async () => {
    const userCount = await countAllUsers();
    return userCount;
}

export const findAllUsersService = async () => {
    const users = await findAllUsers();
    return users;
}

export const signInUserService = async(userDetails) => {
    try {
        // 1. check if there is a valid registered with the email
        console.log('userDetails in Service layer: ', userDetails);
        const email = userDetails.email;
        const palinPass = userDetails.password;
        
        const user = await findUserByEmail(email);
        if(!user){
            throw{ 
                status: 404,  // 404- not found
                message: "User not found"
            }
        }

        // 2. compare the password
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);
        
        if(!isPasswordValid){
            throw{
                status: 401,  // 401- unauthorized
                message: "Invalid password"
            }
        }
        
        const token = generateJwtToken({email: user.email, _id: user._id, username: user.username});

        console.log("service layer, jwt token: ", token);
        
        return token;

    } catch (error) {
        console.log("found error in service layer");
        
        throw error;
    }
}

export const checkIfUserExistService = async(email) => {
    try {
        const user = await findUserByEmail(email);
        if(!user){
            throw{ 
                status: 404,  // 404- not found
                message: "User not found"
            }
        }
        return user;
    } catch (error) {
        throw error;
    }
}