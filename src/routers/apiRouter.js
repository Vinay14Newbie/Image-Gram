// This api router will be triggered when any request starting with /api users

import express from 'express';
import postRouter from './v1/post.js'
import userRouter from './v1/user.js'
import v1Router from './v1/v1Router.js'

const router = express.Router();

router.use('/posts', postRouter);  // If in the remaining url i.e. after /api, we have the url starting with /posts, then the request is forwarded to the postRouter;
// when we use() function it will check the location i.e. /posts And very last router of whole chaining will have the 'GET' or 'POST' requests

router.use('/users', userRouter);

router.use('/v1', v1Router)

export default router;