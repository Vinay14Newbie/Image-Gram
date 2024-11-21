import express from 'express' //express is a function
import connectDB from './dbConfig.js';
// import postRouter from './routers/v1/post.js';  //In JS (and specifically in ES6 modules), you can import a default export with any name you like.
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './utils/swaggerOptions.js';
import {rateLimit} from 'express-rate-limit'
import cookieParser from 'cookie-parser';
import { authorizationViaCookies } from './middlewares/authViaCookies.js';


const PORT = 3000;

const app = express();  // create express app server instance

app.use(cookieParser());


const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5  // limit each IP to 5 requests per windowMs
})

app.use(limiter);  // apply rate limiter to all requests

// exporess.json() is a middleware which parse the json
// use() helps us to add middleware to every single requests 
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api', apiRouter);   // If the url  starts with /api then the request is forwarded to the apiRouter


app.get('/ping', /*express.json()*/ /*isAuthenticated*/ authorizationViaCookies, (req, res)=>{
    console.log(req.body);
    console.log("index layer: ", req.user);
    
    return res.json({message: "pong"})
})


app.get('/hello', (req, res) => {
    return res.json({message: "hello there it's Render deployment"})
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})