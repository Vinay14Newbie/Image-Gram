import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        uique: true,
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
    password: {
        type: String, 
        required: true, 
        minLength: 5
    }
}, {timestamps: true});  //timestamps will keep updating the time of created at/ updated at.

const user = mongoose.model('User', userSchema)

export default user;