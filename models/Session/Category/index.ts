import { Schema, model } from 'mongoose';

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    session: { type: Schema.Types.ObjectId, ref: 'Session' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Category', Category);
