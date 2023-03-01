import { object, string, TypeOf } from 'zod';

export const createPostSchema = object({
  body: object({
    content: string({ required_error: 'Post content is required' }),
    user: string({ required_error: 'User is required' }),
  })
});



export const deletePostSchema = object({
  body: object({
    postId: string({ required_error: '_id value of the document is required' })
  })
});


// export const loginPostSchema = object({
//   body: object({
//     co: string({ required_error: 'Email is required' }).email(
//       'Invalid email or password'
//     ),
//     password: string({ required_error: 'Password is required' }).min(
//       8,
//       'Invalid email or password'
//     ),
//   }),
// });

export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type DeletePostInput = TypeOf<typeof deletePostSchema>['body'];
// export type LoginPostInput = TypeOf<typeof loginPostSchema>['body'];
