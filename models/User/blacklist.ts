import { Schema, model } from 'mongoose';

const Blacklist = new Schema(
  {
    token: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Blacklist', Blacklist);
