import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const post = res.locals.post;
    if (!allowedRoles.includes(post.role)) {
      return next(
        new AppError('You are not allowed to perform this action', 403)
      );
    }

    next();
  };
