import express from 'express' //express is a function
import connectDB from './dbConfig.js';
import {createPost} from './controllers/postController.js';
import { s3uploader } from './multerConfig.js';

const PORT = 3000;

const app = express();  // create express app server instance

// exporess.json() is a middleware which parse the json
// use() helps us to add middleware to every single requests 
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


app.get('/hello', (req, res)=>{
    console.log("Hello from vinay");
    return res.json({greet: "Hello"})
})

app.get('/ping', /*express.json()*/ (req, res)=>{
    console.log(req.body);
    return res.json({message: "pong"})
})


app.post('/post', s3uploader.single('image'), createPost);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})