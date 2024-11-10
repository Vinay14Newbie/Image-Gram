// After /users the remaining part of url is handled here

import express from 'express';
import { findAllUsers, getProfile, signIn } from '../../controllers/userController.js';
import { createUser } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignUpSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const router = express.Router();

router.get('/profile', getProfile);

router.post('/signup', validate(zodSignupSchema), createUser);

router.post('/signin', validate(zodSigninSchema), signIn);

router.get('/', findAllUsers);

export default router;