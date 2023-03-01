import { NextFunction, Request, Response } from 'express';
import { findAllPosts } from '../services/post.service';
import { CreatePostInput, DeletePostInput } from '../schema/post.schema';
import {
  createPost,
  deletePost,
  findPost,
  findPostById,  
} from '../services/post.service';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = res.locals.post;
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllPostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await findAllPosts();
    res.status(200).json({
      status: 'success',
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await findAllPosts();
    res.status(200).json({
      status: 'success',
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await createPost({      
      content: req.body.content,
      user: req.body.user,
    });

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      console.log(err);
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};


export const deletePostHandler = async (
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await deletePost(     
      req.body.postId
    );

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};
