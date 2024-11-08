import AWS from 'aws-sdk';
import { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from './serverConfig.js';

export const s3 = new AWS.S3({
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
})

// console.log(AWS_REGION);
// console.log(AWS_ACCESS_KEY);
// console.log(AWS_SECRET_ACCESS_KEY);