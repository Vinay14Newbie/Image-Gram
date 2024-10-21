import express from 'express' //express is a function
import connectDB from './dbConfig.js';

const PORT = 3000;

const app = express();  // create express app server instance

app.get('/hello', (req, res)=>{
    console.log("Hello from vinay");
    return res.json({greet: "Hello"})
})

app.get('/ping', (req, res)=>{
    return res.json({message: "pong"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})