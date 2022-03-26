import { Schema, model } from 'mongoose';

const Nominee = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    regNo: Number,
    level: Number,
    picture: String,
    votes: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Nominee', Nominee);
