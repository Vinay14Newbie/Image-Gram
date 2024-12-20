import { createPostService, deletePostByidService, getAllPostService, updatePostByidService } from "../services/postService.js";

export async function createPost(req, res) {
    // call the service layer function
    console.log(req.file);

    if(!req.file || !req.file.location){
        return res.status(400).json({
            success: false,
            message: "image is required"
        })
    }
    
    const post = await createPostService({
        caption: req.body.caption,
        image: req.file.location,
        user: req.user._id,
    })

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    })
}


// /api/v1/posts?limit=10&offset=0
export async function getAllPosts(req, res) {  // the req (request) object contains information about the HTTP request made to the server.
    
    try {
        const limit = req.query.limit || 5;        
        const offset = req.query.offset || 0;
        
        const paginatePosts = await getAllPostService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "all posts fetched successfully",
            data: paginatePosts
        })
    } catch (error) {
        console.log("error found while getting all Posts: "+error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


export async function deletePostByid(req, res) {
    try {
        const postId = req.params.id
        const response = await deletePostByidService(postId, req.user._id);

        if(!response){
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'post deleted succesfully',
            data: response
        })
    } catch (error) {
        console.log("Error found while deleting");
        if(error.status){
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            status: false,
            message: "Internal error"
        })
    }
}


export async function updatePost(req, res) {
    try {
        console.log("req file "+req.file);
        
        const updateObject = req.body;
        if(req.file){
            updateObject.image = req.file.location;
        }
        const response = await updatePostByidService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: response
        })
    } catch (error) {
        console.log("Error found while deleting");
        return res.status(500).json({
            status: false,
            message: "Internal error"
        })
    }
}