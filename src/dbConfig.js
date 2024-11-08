import mongoose from "mongoose";   // server -> ODM -> database
import { DB_URL } from "./serverConfig.js";

export default async function connectDB() {
    try{
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Something went wrong: "+error);
    }
}
// console.log(DB_URL);