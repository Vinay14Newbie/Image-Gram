import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    onModel: {  // this property will tell us that where we have created this like property such as story, reel, comment or post...
        type: String,
        required: true,
        enum: ["Post", "Comment"]
    },
    likeableId: {   // 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"  
    }
}, {timestamps: true})

const Like = mongoose.model("Like", likeSchema);

export default Like;