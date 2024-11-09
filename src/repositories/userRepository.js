import User from "../schema/user.js";


export const createUser = async (user) => {
    try {
        // const newUser = new User({username, email, password});
        // await newUser.save();
        // OR

        const newUser = await User.create(user);

        return newUser;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email});
        return user;       
    } 
    catch (error) {
        console.log(error);
    }
}

export const countAllUsers = async () => {
    try {
        const count = await User.countDocuments();
        return count;     
    } catch (error) {
        console.log("Found some error while counting all users: "+error);
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;        
    } catch (error) {
        console.log(error);
    }
}