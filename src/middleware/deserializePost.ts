import { NextFunction, Request, Response } from 'express';
import { findPostById } from '../services/post.service';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';

export const deserializePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }
    next();
  } catch (err: any) {
    next(err);
  }
};
