import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        minLength: 5
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        minLength: 5,
        validate: {
            validator: function (emailValue) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue);
            }, 
            message: "Invalid email format"
        }
    },
    role: {  // so, this role will be either "user" or "admin" as a string
        type: String, 
        default: "user",
        enum: ["user", "admin"]  // enum defines that this role property either have "user" or "admin" as a string no other string you can attach to this role
    },
    password: {
        type: String, 
        required: true, 
        minLength: 5
    }
}, {timestamps: true});  //timestamps will keep updating the time of created at/ updated at.


userSchema.pre('save',function modifyPassword(next){   // save is an event by which this functin will be called just before the 'save'
    // incoming user object
    const user = this;  // object with plain password  
    // this keyword will have the access to incoming user object

    const SALT = bcrypt.genSaltSync(9);  //salt - the cost of processing the data

    // hash password
    const hashedPassword = bcrypt.hashSync(user.password, SALT);

    // replace plain password with hashed password
    user.password = hashedPassword;

    next();
})

const User = mongoose.model('User', userSchema)

export default User;