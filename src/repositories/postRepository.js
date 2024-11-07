import Post from "../schema/post.js";


export const createPost = async (caption, image, user) => {
    try {
        // const newPost = await Post.create({caption, image, user});

        // another way
        const newPost = new Post({caption, image, user});
        await newPost.save();

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export const findAllPosts = async (offset, limit) => {
    try{
        const posts = await Post.find().sort({createdAt: -1}).skip(offset).limit(limit);
        return posts;
    }
    catch(error){
        console.log(error);
    }
}

export const countAllPosts = async () => {
    try {
        const count = await Post.countDocuments();
        return count;     
    } catch (error) {
        console.log("Found some error while counting all posts: "+error);
    }
}

export const findPostById = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        console.log(error);
    }
}