export async function createPost(req, res) {
    // call the service layer function
    console.log(req.file);
    
    return res.json({message: "Post created successfully"})
}