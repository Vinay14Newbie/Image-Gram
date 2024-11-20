import { createComment, findCommentById } from "../repositories/commentRepository.js";
import { findPostById } from "../repositories/postRepository.js";

export const createCommentService = async (content, userId, onModel, commentableId) => {
    try{
        let parent = await findCommentParent(onModel, commentableId);
        if(!parent){
            throw{
                status: 404,
                message: `${onModel} not found`
            }
        }
        console.log("Before creating comment in srvice layer parent: ", parent);
        
        const newComment = await createComment(content, userId, onModel, commentableId);

        console.log("Service layer of create comment: ", newComment);

        await addChildCommentToParent(onModel, newComment, parent);

        return newComment;
    }
    catch (error) {
        console.log("found error while commenting in service layer: ", error);
        throw error;
    }
}


const addChildCommentToParent = async (onModel, comment, parent) => {
    try {
        if(onModel == "Post"){
            parent.comments.push(comment._id);
        }        
        else if(onModel == "Comment"){
            parent.replies.push(comment._id);
        }
        await parent.save();
    }
     catch (error) {
        console.log(error);
    }
}


const findCommentParent = async (onModel, commentableId) => {
    try {
        let parent;
        if(onModel == "Post"){
            parent = await findPostById(commentableId);
        }        
        else if(onModel == "Comment"){
            parent = await findCommentById(commentableId);
        }
        return parent;
    } catch (error) {
        console.log(error);
    }
}


export const findCommentByIdService = async(id) => {
    try {
        const comment = await findCommentById(id);      
        return comment;  
    } catch (error) {
        console.log(error);
        throw error;
    }
}