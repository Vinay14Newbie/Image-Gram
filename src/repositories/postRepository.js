import Post from "../schema/post.js";
import { AWS_BUCKET_NAME } from "../serverConfig.js";
import { s3 } from "../awsConfig.js"


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

export const deletePostByid = async (id) => {
    try {
        const post = await Post.findByIdAndDelete(id);
        
        return post;
    } catch (error) {
        console.log("failed to delete the document: "+error);
    }
}

export const updatePostByid = async (id, updateObject) => {
    try {
        // first delete the old image (if updating) from aws s3

        const oldPost = await Post.findById(id);

        if(!oldPost){
            console.log('post not found');
            return null;
        }

        if(updateObject.image && oldPost.image){
            const oldImageKey = oldPost.image.split('/').pop();  // Assuming the URL follows S3 standard format, this will get the file key (filename)

            
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: oldImageKey
            };
            await s3.deleteObject(params).promise();
            
            console.log("old image deleted successfully");
        }        


        const post = await Post.findByIdAndUpdate(id, updateObject, {new: true});
        // By default mongoose returnes the old documents
        // {new: true} this object stops the mongoose to return old document & returns the new document 

        return post;
    } catch (error) {
        console.log("failed to update the post: "+error);
    }
}