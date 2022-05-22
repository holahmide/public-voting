import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { PASSWORD_SALT_ROUNDS } from '../../config';

const Admin = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

Admin.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    // @ts-ignore
    this.password = await bcrypt.hash(this.password, PASSWORD_SALT_ROUNDS);
    next();
  } catch (err: any) {
    next(err);
  }
});

Admin.methods.validatePassword = async function (data:String) {
  // @ts-ignore
  return bcrypt.compare(data, this.password);
};

export default model('Admin', Admin);
