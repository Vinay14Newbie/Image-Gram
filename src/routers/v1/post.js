// Here all post related routes are present
// We look at the remaining url part after /posts

import express from 'express'

import { s3uploader } from '../../multerConfig.js';
import { createPost, getAllPosts } from '../../controllers/postController.js';

const router = express.Router();  // router object to modularize the routes

router.post('/', s3uploader.single('image'), createPost)

router.get('/', getAllPosts)

export default router;