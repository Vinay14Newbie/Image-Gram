// 1. Take the image of the post and upload on aws
// 2. Get the url of the image from the aws response
// 3. Create a post with the caption and the image url in the 'database' using repository
// 4. Return the post object

import { createPost, findAllPosts, countAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const image = createPostObject.image;
    // const user = createPostObject.user; 

    const post = await createPost(caption, image);

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