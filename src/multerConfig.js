import multer from 'multer';
import multers3 from 'multer-s3';
import { s3 } from './awsConfig.js';
import { AWS_BUCKET_NAME } from './serverConfig.js';


export const s3uploader = multer({  // uploader is a middleware
    storage: multers3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        // acl: "public-read",   // Access control for the file
        key: function(req, file, cb){  // The name of the file	
            console.log(file);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1e9); // to make sure the key is unique
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);   // error first callback (null = no error)
        } 
    }) 
});