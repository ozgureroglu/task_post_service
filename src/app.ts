const path = require('path');
import * as dotenv from 'dotenv'

console.log(path.resolve(__dirname, '..',`${process.env.NODE_ENV}.env`))
dotenv.config({
  path: path.resolve(__dirname, '..',`${process.env.NODE_ENV}.env`)
});


import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import postRouter from './routes/post.route';

console.log("***************passed")
console.log(process.env)
console.log(process.env.NODE_ENV)

console.log(process.env.MONGODB_USERNAME)
console.log(process.env.MONGODB_SERVER)
console.log(process.env.MONGODB_PORT)
console.log(process.env.MONGODB_DATABASE_NAME)
console.log(process.env.REDIS_SERVER)
console.log(process.env.REDIS_PORT)

// console.log(`${config.get('dbUsername')}`)
console.log('\n'+`${config.get('dbServer')}`)
console.log(`${config.get('dbPort')}`)
console.log(`${config.get('dbUsername')}`)
console.log(`${config.get('dbPass')}`)
console.log(`${config.get('dbName')}`)
console.log(`${config.get('redisServer')}`)
console.log(`${config.get('redisPort')}`)


// Create the applicatio
const app = express();

// Middleware

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

// 4. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 5. Routes
app.use('/api/posts', postRouter);


// Testing
app.get(
  '/api/healthChecker',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Service is up and running',
    });
  }
);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});
