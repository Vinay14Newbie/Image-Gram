// After /users the remaining part of url is handled here

import express from 'express';
import { findAllUsers, getProfile, signIn } from '../../controllers/userController.js';
import { signUp } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignUpSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const router = express.Router();

router.get('/profile', getProfile);

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 * 
 */
router.post('/signup', validate(zodSignupSchema), signUp);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 * 
 */
router.post('/signin', validate(zodSigninSchema), signIn);

router.get('/', findAllUsers);

export default router;