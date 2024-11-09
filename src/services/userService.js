import { countAllUsers, createUser, findAllUsers, findUserByEmail } from "../repositories/userRepository.js";

export const createUserService = async (createUserObject) => {
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