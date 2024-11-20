import { createCommentService, findCommentByIdService } from "../services/commentService.js";

export async function createComment(req, res) {
    try {
        console.log("controller layer of comment: ", req.body);
        
        const { content, onModel, commentableId } = req.body;
        const response = await createCommentService(content, req.user._id, onModel, commentableId);
        return res.status(201).json({
            success: true,
            message: "comment created successfully",
            data: response
        });

    } 
    catch (error) {
        console.log(error);
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal error"
        })
    }
}


export async function getCommentById(req, res) {
    try {
        const commentId = req.params.id;
        const response = await findCommentByIdService(commentId);
        
        if(!response){
            return res.status(404).json({
                success: false,
                message: 'Comment not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: "comment found successfully",
            data: response
        })
    } catch (error) {
        console.log(error);
        if(error.status){
            return res.status(error.status).json({
                success: false,
                messsage: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}