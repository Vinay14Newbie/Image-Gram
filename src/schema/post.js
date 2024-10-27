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
        tyep: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model("Post", postSchema);

export default Post;