import express from 'express';
import {
  getAllPostsHandler,
  createPostHandler,
  deletePostHandler, 
} from '../controllers/post.controller';


import { deserializePost } from '../middleware/deserializePost';

import { createPostSchema, deletePostSchema } from '../schema/post.schema';
import { validate } from '../middleware/validate';



const router = express.Router();

router.use(deserializePost);

// Get Posts route
router.get('/', getAllPostsHandler);

// Add post route
router.post('/', validate(createPostSchema), createPostHandler);

// Delete post route
router.delete('/delete', validate(deletePostSchema), deletePostHandler);

export default router;
