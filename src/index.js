import express from 'express' //express is a function
import connectDB from './dbConfig.js';
// import postRouter from './routers/v1/post.js';  //In JS (and specifically in ES6 modules), you can import a default export with any name you like.
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './utils/swaggerOptions.js';

const PORT = 3000;

const app = express();  // create express app server instance


// exporess.json() is a middleware which parse the json
// use() helps us to add middleware to every single requests 
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api', apiRouter);   // If the url  starts with /api then the request is forwarded to the apiRouter


app.get('/ping', /*express.json()*/ isAuthenticated, (req, res)=>{
    console.log(req.body);
    console.log("index layer: ", req.user);
    
    return res.json({message: "pong"})
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})