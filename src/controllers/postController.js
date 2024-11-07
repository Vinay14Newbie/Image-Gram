import { createPostService, getAllPostService } from "../services/postService.js";

export async function createPost(req, res) {
    // call the service layer function
    console.log(req.file);
    
    const post = await createPostService({caption: req.body.caption, image: req.file.location})

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