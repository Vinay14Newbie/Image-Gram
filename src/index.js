import express from 'express' //express is a function
import connectDB from './dbConfig.js';
import postRouter from './routers/v1/post.js';  //In JS (and specifically in ES6 modules), you can import a default export with any name you like.
import userRouter from './routers/v1/user.js'
import apiRouter from './routers/apiRouter.js'

const PORT = 3000;

const app = express();  // create express app server instance

// exporess.json() is a middleware which parse the json
// use() helps us to add middleware to every single requests 
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


app.use('/api', apiRouter);   // If the url  starts with /api then the request is forwarded to the apiRouter

app.use('/posts', postRouter);   // if url starts with /posts, then use postRouter to handle the request

app.use('/users', userRouter);   // if url starts with /users, then use postRouter to handle the request



app.get('/ping', /*express.json()*/ (req, res)=>{
    console.log(req.body);
    return res.json({message: "pong"})
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})