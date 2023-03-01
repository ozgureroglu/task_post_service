import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

// @index({ email: 1 })
// @pre<Post>('save', async function () {
//   // Hash password if the password is new or was updated
//   if (!this.isModified('password')) return;

//   // Hash password with costFactor of 12
//   // this.password = await bcrypt.hash(this.password, 12);
// })
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the Post class to be used as TypeScript type
export class Post {
  @prop({ required: true })
  content: string;

  @prop({ required: true })
  user: string;
}

// Create the post model from the Post class
const postModel = getModelForClass(Post);
export default postModel;
