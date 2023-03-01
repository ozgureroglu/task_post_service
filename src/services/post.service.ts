import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import postModel, { Post } from '../models/post.model';

import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

// CreatePost service
export const createPost = async (input: Partial<Post>) => {
  const post = await postModel.create(input);
  return omit(post.toJSON());
};

// DeletePost service
export const deletePost = async (id: string) => {
  const post = await postModel.deleteOne({ _id: id });
  return omit(post);
};


// Find Post by Id
export const findPostById = async (id: string) => {
  const post = await postModel.findById(id).lean();
  return omit(post);
};

// Find All posts
export const findAllPosts = async () => {
  return await postModel.find();
};

// Find one post by any fields
export const findPost = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOne(query, {}, options).select('+password');
};


