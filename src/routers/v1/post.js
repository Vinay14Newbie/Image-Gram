// Here all post related routes are present
// We look at the remaining url part after /posts

import express from 'express'

import { s3uploader } from '../../multerConfig.js';
import { createPost, deletePostByid, getAllPosts, updatePost } from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidator.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { isAuthenticated, isAdmin } from '../../middlewares/authMiddleware.js';

const router = express.Router();  // router object to modularize the routes

router.post('/', isAuthenticated, s3uploader.single('image'), validate(zodPostSchema), createPost);

router.get('/', getAllPosts)

router.delete('/:id', isAuthenticated, deletePostByid);  // Express will treat anything after /posts/ as the id parameter. It’s intended to be part of the URL path, not a query string.

router.put('/:id', isAuthenticated, isAdmin, s3uploader.single('image'), updatePost)


export default router;