import Comment from "../schema/comment.js";

export const createComment = async(content, userId, onModel, commentableId) => {
    try {
        const newComment = await Comment.create({ content, userId, onModel, commentableId, likes: [], replies: [] });
        return newComment;
    } catch (error) {
        console.log("error in repo layer of comments: ", error);
    }
}

export const findCommentById = async(id) => {
    try {
        const comment = await Comment.findById(id).populate("replies");
        if(!comment){
            throw {
                status: 404,
                message: "Comment not found"
            }
        }
        return comment;
    } catch (error) {
        console.log("error in repo layer of comments while finding comment by id: ", error);        
    }
}