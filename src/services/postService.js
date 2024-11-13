// 1. Take the image of the post and upload on aws
// 2. Get the url of the image from the aws response
// 3. Create a post with the caption and the image url in the 'database' using repository
// 4. Return the post object

import { createPost, findAllPosts, countAllPosts, deletePostByid, updatePostByid, findPostById } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    const user = createPostObject.user; 

    const post = await createPost(caption, image, user);

    return post;
}


export const getAllPostService = async (offset, limit) => {
    const posts = await findAllPosts(offset, limit);

    // Calculate total number of posts and total number of pages
    const totalDocuments = await countAllPosts();

    const totalPages = Math.ceil(totalDocuments) / limit;  //it will give exact no. of pages where we want to render the data at the specific limit

    return{
        posts, totalPages ,totalDocuments
    }
}


export const deletePostByidService = async (id, user) => {
    
    const post = await findPostById(id);
    
    console.log("Post returned by findPostById: ", post.user.toString());
    console.log("user from controller ", user);

    if(post.user.toString() != user) {
        throw {
            status: 401,
            message: "Unauthorized"
        }
    }
    
    const response = await deletePostByid(id);
    return response;
}


export const updatePostByidService = async (id, updateObject) => {
    const response = await updatePostByid(id, updateObject);
    return response;
}