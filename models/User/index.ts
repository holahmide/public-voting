import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { PASSWORD_SALT_ROUNDS } from '../../config';

const User = new Schema(
  {
    firstName: String,
    lastName: String,
    regno: Number,
    email: String,
    password: String,
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

User.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, PASSWORD_SALT_ROUNDS);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Removes other model documents associated with the user on User.deleteOne()
// User.post('deleteOne', { document: true }, async function (next) {
//   await Blog.deleteOne({ author: this._id }).exec();
//   next();
// });

User.methods.validatePassword = async function (data:String) {
  // @ts-ignore
  return bcrypt.compare(data, this.password);
};

export default model('User', User);
