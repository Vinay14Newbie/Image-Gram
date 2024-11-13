import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        minLength: 5
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  // The ref option is what tells Mongoose which model to use during population
    }
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);   //it'll create a 'posts' collection in mongodb

export default Post;