import { createPostService, deletePostByidService, getAllPostService, updatePostByidService } from "../services/postService.js";

export async function createPost(req, res) {
    // call the service layer function
    console.log(req.file);
    
    const post = await createPostService({
        caption: req.body.caption,
        image: req.file.location
    })

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    })
}


// /api/v1/posts?limit=10&offset=0
export async function getAllPosts(req, res) {
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
        const id = req.params.id
        const response = await deletePostByidService(id);

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