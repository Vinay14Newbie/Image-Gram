import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from './serverConfig.js';

const s3 = new AWS.S3({
    region: '',
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
})

console.log(AWS_ACCESS_KEY);
console.log(AWS_SECRET_ACCESS_KEY);